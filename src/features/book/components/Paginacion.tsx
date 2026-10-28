import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginacionProps {
  pagina: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
}

const BOTON =
  'inline-flex items-center gap-1.5 rounded-md border border-yellow-600 px-4 py-2 text-sm font-semibold text-stone-300 enabled:cursor-pointer enabled:hover:border-yellow-800 enabled:hover:bg-yellow-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:transition-colors'

export function Paginacion({ pagina, totalPaginas, onCambiar }: PaginacionProps) {
  // Con una sola página no hay nada que paginar.
  if (totalPaginas <= 1) return null

  const ir = (nueva: number) => {
    onCambiar(nueva)
    // Sin esto, al pasar de página quedarías al final de la lista nueva.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={() => ir(pagina - 1)}
        disabled={pagina === 1}
        className={BOTON}
      >
        <ChevronLeft className="size-4" />
        Anterior
      </button>

      <p aria-live="polite" className="text-sm text-stone-400">
        Página {pagina} de {totalPaginas}
      </p>

      <button
        type="button"
        onClick={() => ir(pagina + 1)}
        disabled={pagina === totalPaginas}
        className={BOTON}
      >
        Siguiente
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}