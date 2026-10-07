import { Link } from 'react-router'
import { BookOpen, Heart, Library } from 'lucide-react'

import { rutaLibro } from '../../../router'
import type { Libro } from '../Models/BookModels'

export function Libros({ libros }: { libros: Libro[] }) {
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl bg-stone-100/10 px-4 py-16 text-center ring-1 ring-stone-100/15">
        <Library className="size-9 text-stone-400" />
        <p className="text-stone-300">Todavía no hay libros en el catálogo.</p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {libros.map((libro) => (
        <li key={libro.bookId} className="group relative">
          <Link
            to={rutaLibro(libro.bookId)}
            className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500"
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-teal-900 shadow-lg shadow-black/40 ring-1 ring-stone-100/10 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50 motion-safe:transition-all">
              {libro.coverUrl ? (
                <img
                  src={libro.coverUrl}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-[1.03] motion-safe:transition-transform motion-safe:duration-300"
                />
              ) : (
                <div className="grid size-full place-items-center text-stone-400">
                  <BookOpen className="size-10" />
                </div>
              )}

              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3 text-center text-xs font-bold tracking-wide text-stone-100 uppercase opacity-0 group-hover:opacity-100 motion-safe:transition-opacity">
                Ver libro
              </span>
            </div>

            <h3 className="mt-3 line-clamp-2 font-serif text-sm leading-snug font-semibold text-stone-100">
              {libro.title}
            </h3>

            {libro.authors.length > 0 && (
              <p className="mt-0.5 line-clamp-1 text-xs text-stone-400">
                {libro.authors.join(', ')}
              </p>
            )}
          </Link>

          {/* Fuera del enlace para no anidar dos elementos interactivos. */}
          <button
            type="button"
            disabled
            aria-label={`Guardar ${libro.title} en favoritos`}
            title="Guardar en favoritos estará disponible pronto"
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/45 text-stone-200 opacity-0 backdrop-blur-sm group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:cursor-not-allowed motion-safe:transition-opacity"
          >
            <Heart className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  )
}
