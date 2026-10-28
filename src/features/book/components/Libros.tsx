import { Link } from 'react-router'
import { BookOpen, Library } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { rutaLibro } from '../../../router'
import { BotonFavorito } from '../../favoritebook/components/BotonFavorito'
import type { Libro } from '../Models/BookModels'

function TarjetaLibro({ libro }: { libro: Libro }) {
  const { t } = useTranslation()

  return (
    <li className="group relative rounded-2xl bg-teal-900/35 p-5 ring-1 ring-stone-100/10 hover:ring-yellow-600/40 motion-safe:transition-colors">
      <Link
        to={rutaLibro(libro.bookId)}
        className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500"
      >
        {/* La portada no llena la tarjeta: va centrada y más pequeña, como un libro sobre la mesa. */}
        <div className="relative mx-auto aspect-2/3 w-2/3 max-w-50 overflow-hidden rounded-md bg-teal-950 shadow-xl shadow-black/50 group-hover:-translate-y-1 group-hover:shadow-2xl motion-safe:transition-all">
          {libro.coverUrl ? (
            <>
              <img
                src={libro.coverUrl}
                alt={t('book:coverAlt')}
                loading="lazy"
                className="size-full object-cover"
              />
              {/*lo que se mira cuando se oculta la imagen  */}
              <span
                aria-hidden
                className="alt-portada absolute inset-0 place-items-center p-3 text-center font-serif text-sm leading-snug font-bold text-stone-200"
              >
                {libro.title}
              </span>
            </>
          ) : (
            <div className="grid size-full place-items-center text-stone-400">
              <BookOpen className="size-10" />
            </div>
          )}

          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3 text-center text-xs font-bold tracking-wide text-stone-100 uppercase opacity-0 group-hover:opacity-100 motion-safe:transition-opacity">
            {t('book:catalog.viewBook')}
          </span>
        </div>

        <h3 className="mt-6 line-clamp-2 font-serif text-lg leading-snug font-bold text-stone-100">
          {libro.title}
        </h3>

        {libro.authors.length > 0 && (
          <p className="mt-1 line-clamp-1 text-sm text-stone-400">{libro.authors.join(', ')}</p>
        )}
      </Link>

      {/* Fuera del enlace para no anidar dos elementos interactivos. */}
      <div className="absolute top-3 right-3">
        <BotonFavorito bookId={libro.bookId} titulo={libro.title} />
      </div>
    </li>
  )
}

export function Libros({ libros }: { libros: Libro[] }) {
  const { t } = useTranslation()

  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-teal-900/35 px-4 py-16 text-center ring-1 ring-stone-100/10">
        <Library className="size-9 text-stone-400" />
        <p className="text-stone-300">{t('book:catalog.empty')}</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {libros.map((libro) => (
        <TarjetaLibro key={libro.bookId} libro={libro} />
      ))}
    </ul>
  )
}
