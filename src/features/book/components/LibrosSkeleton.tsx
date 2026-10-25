import { Skeleton } from '../../../components/ui/skeleton'
import { LIBROS_POR_PAGINA } from '../lib/paginar'

export function LibrosSkeleton({ cantidad = LIBROS_POR_PAGINA }: { cantidad?: number }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Cargando libros…</span>

      {/* Oculto para lectores de pantalla: el aviso de arriba ya informa. */}
      <ul aria-hidden className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cantidad }, (_, indice) => (
          <li key={indice} className="rounded-2xl bg-teal-900/35 p-5 ring-1 ring-stone-100/10">
            <Skeleton className="mx-auto aspect-2/3 w-2/3 max-w-50 rounded-md" />
            <Skeleton className="mt-6 h-4.5 w-full" />
            <Skeleton className="mt-2 h-4.5 w-3/4" />
            <Skeleton className="mt-3 h-3.5 w-1/2" />
          </li>
        ))}
      </ul>
    </div>
  )
}
