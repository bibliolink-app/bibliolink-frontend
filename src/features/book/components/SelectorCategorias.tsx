import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { CategoriaConConteo } from '../lib/categorias'

interface SelectorCategoriasProps {
  categorias: CategoriaConConteo[]
  valor: string
  onChange: (code: string) => void
}

export function SelectorCategorias({ categorias, valor, onChange }: SelectorCategoriasProps) {
  const { t } = useTranslation()
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)

  // Se cierra al tocar fuera del panel o al presionar Escape.
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

  const elegir = (code: string) => {
    onChange(code)
    setAbierto(false)
  }

  const activa = categorias.find((categoria) => categoria.code === valor)

  const opcion = (code: string, etiqueta: string, cantidad?: number) => (
    <li key={code || 'todas'}>
      <button
        type="button"
        onClick={() => elegir(code)}
        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-yellow-600/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors ${
          valor === code ? 'font-semibold text-yellow-500' : 'text-stone-300'
        }`}
      >
        <Check aria-hidden className={`size-4 shrink-0 ${valor === code ? '' : 'invisible'}`} />
        <span className="min-w-0 flex-1 truncate">{etiqueta}</span>
        {cantidad !== undefined && <span className="text-xs text-stone-500">{cantidad}</span>}
      </button>
    </li>
  )

  return (
    <div ref={contenedor} className="relative w-full shrink-0 sm:w-auto">
      <button
        type="button"
        onClick={() => setAbierto((actual) => !actual)}
        aria-expanded={abierto}
        className={`inline-flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-3.5 text-sm font-semibold sm:w-auto sm:min-w-56 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 motion-safe:transition-colors ${
          activa
            ? 'border-yellow-600 bg-yellow-600 text-stone-900'
            : 'border-stone-100/15 bg-teal-900/40 text-stone-300 hover:border-yellow-600/50'
        }`}
      >
        <span className="truncate">{activa?.nombre ?? t('book:categories.label')}</span>
        <ChevronDown
          aria-hidden
          className={`size-4 shrink-0 motion-safe:transition-transform ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {abierto && (
        <div className="absolute right-0 z-20 mt-2 max-h-80 w-full overflow-y-auto overscroll-contain rounded-xl border border-yellow-600/40 bg-teal-950 p-2 shadow-xl shadow-black/50 sm:w-72">
          <ul>
            {opcion('', t('book:categories.all'))}
            {categorias.map((categoria) =>
              opcion(categoria.code, categoria.nombre, categoria.cantidad),
            )}
          </ul>
        </div>
      )}
    </div>
  )
}