import { Link, useParams } from 'react-router'
import { ArrowLeft, BookOpen, CircleAlert } from 'lucide-react'

import { PATHS, rutaLector } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { useBook } from '../Hook/BookHook'
import { bookErrorMessage } from '../lib/bookErrorMessage'

export function BookDetailPage() {
  const bookId = Number(useParams().bookId)
  const { data: libro, isPending, isError, error } = useBook(bookId)

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to={PATHS.home}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver al catálogo
      </Link>

      {isPending && <LoadingScreen />}

      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{bookErrorMessage(error)}</p>
        </div>
      )}

      {libro && (
        <article className="grid gap-8 sm:grid-cols-[14rem_1fr]">
          <div className="aspect-2/3 w-full overflow-hidden rounded-lg bg-stone-300 shadow-lg shadow-black/25 ring-1 ring-stone-500/20">
            {libro.coverUrl ? (
              <img src={libro.coverUrl} alt="" className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-stone-600">
                <BookOpen className="size-12" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h1 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
              {libro.title}
            </h1>

            {libro.authors.length > 0 && (
              <p className="mt-2 text-lg text-stone-300">{libro.authors.join(', ')}</p>
            )}

            <Link
              to={rutaLector(libro.bookId)}
              className="mt-6 inline-flex items-center gap-2.5 rounded-md bg-yellow-600 px-5 py-3 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
            >
              <BookOpen className="size-5" />
              Leer
            </Link>

            {libro.languages.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {libro.languages.map((idioma) => (
                  <li
                    key={idioma.languageCode}
                    className="rounded-full bg-yellow-600/15 px-3 py-1 text-xs font-bold tracking-wide text-yellow-500 uppercase ring-1 ring-yellow-600/30"
                  >
                    {idioma.name}
                  </li>
                ))}
              </ul>
            )}

            {libro.description && (
              <p className="mt-6 whitespace-pre-line text-stone-300">{libro.description}</p>
            )}
          </div>
        </article>
      )}
    </div>
  )
}
