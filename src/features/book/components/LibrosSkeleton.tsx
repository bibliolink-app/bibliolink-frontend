import { Skeleton } from '../../../components/ui/skeleton'
import { LIBROS_POR_PAGINA } from '../lib/paginar'


export function LibrosSkeleton({ cantidad = LIBROS_POR_PAGINA }: { cantidad?: number }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Cargando libros…</span>

      {/* Oculto para lectores de pantalla: el aviso de arriba ya informa. */}
      <ul
        aria-hidden
        className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {Array.from({ length: cantidad }, (_, indice) => (
       
          <li key={indice}>
            <Skeleton className="aspect-2/3 w-full rounded-xl" />
            <Skeleton className="mt-3 h-3.5 w-full" />
            <Skeleton className="mt-1.5 h-3.5 w-3/4" />
            <Skeleton className="mt-2.5 h-2.5 w-1/2" />
          </li>
        ))}
      </ul>
    </div>
  )
}
