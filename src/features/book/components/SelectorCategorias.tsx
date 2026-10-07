import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Tags } from 'lucide-react'

import { nombreVisible, type CategoriaConConteo } from '../lib/categorias'

interface SelectorCategoriasProps {
  categorias: CategoriaConConteo[]
  valor: string
  onChange: (categoria: string) => void
}

export function SelectorCategorias({ categorias, valor, onChange }: SelectorCategoriasProps) {
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!abierto) return

    const alTocarAfuera = (evento: PointerEvent) => {
      if (!contenedor.current?.contains(evento.target as Node)) {
        setAbierto(false)
      }
    }

    const alPresionarTecla = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setAbierto(false)
    }

    document.addEventListener('pointerdown', alTocarAfuera)
    document.addEventListener('keydown', alPresionarTecla)

    return () => {
      document.removeEventListener('pointerdown', alTocarAfuera)
      document.removeEventListener('keydown', alPresionarTecla)
    }
  }, [abierto])

  const elegir = (categoria: string) => {
    onChange(categoria)
    setAbierto(false)
  }

  const opcion = (categoria: string, etiqueta: string, cantidad?: number) => (
    <li key={categoria || 'todas'}>
      <button
        type="button"
        onClick={() => elegir(categoria)}
        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-yellow-600/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors ${
          valor === categoria ? 'font-semibold text-yellow-500' : 'text-stone-300'
        }`}
      >
        <Check
          aria-hidden
          className={`size-4 shrink-0 ${valor === categoria ? '' : 'invisible'}`}
        />
        <span className="min-w-0 flex-1 truncate">{etiqueta}</span>
        {cantidad !== undefined && <span className="text-xs text-stone-500">{cantidad}</span>}
      </button>
    </li>
  )

  return (
    <div ref={contenedor} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setAbierto((actual) => !actual)}
        aria-expanded={abierto}
        className={`inline-flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors ${
          valor === ''
            ? 'border-yellow-600 text-stone-300 hover:bg-yellow-600/10'
            : 'border-yellow-600 bg-yellow-600 text-stone-900'
        }`}
      >
        <Tags className="size-5 shrink-0" />
        <span className="max-w-40 truncate">
          {valor === '' ? 'Categorías' : nombreVisible(valor)}
        </span>
        <ChevronDown
          aria-hidden
          className={`size-4 shrink-0 motion-safe:transition-transform ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {abierto && (
        <div className="absolute right-0 z-20 mt-2 max-h-80 w-72 overflow-y-auto rounded-xl border border-yellow-600/40 bg-teal-950 p-2 shadow-xl shadow-black/50">
          <ul>
            {opcion('', 'Todas las categorías')}
            {categorias.map((categoria) =>
              opcion(categoria.nombre, nombreVisible(categoria.nombre), categoria.cantidad),
            )}
          </ul>
        </div>
      )}
    </div>
  )
}