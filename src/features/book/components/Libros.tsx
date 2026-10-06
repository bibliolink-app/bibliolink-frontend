import { BookOpen, Library } from 'lucide-react'

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
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {libros.map((libro) => (
        <li
          key={libro.bookId}
          className="flex flex-col overflow-hidden rounded-lg bg-stone-100 shadow-lg shadow-black/20 ring-1 ring-stone-500/20"
        >
          <div className="aspect-2/3 w-full bg-stone-300">
            {libro.coverUrl ? (
              <img
                src={libro.coverUrl}
                alt=""
                loading="lazy"
                className="size-full object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center text-stone-600">
                <BookOpen className="size-10" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1 p-3.5">
            <h3 className="font-serif text-base leading-snug font-semibold text-stone-900">
              {libro.title}
            </h3>

            {libro.authors.length > 0 && (
              <p className="text-sm text-stone-600">{libro.authors.join(', ')}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
