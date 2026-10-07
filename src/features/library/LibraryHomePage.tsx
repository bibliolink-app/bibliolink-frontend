import { useState } from 'react'
import { ChevronLeft, ChevronRight, CircleAlert, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { useBooks } from '../book/Hook/BookHook'
import { bookErrorMessage } from '../book/lib/bookErrorMessage'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

const BOTON =
  'inline-flex items-center gap-1.5 rounded-md border border-yellow-600 px-4 py-2 text-sm font-semibold text-stone-300 hover:border-rose-900 hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:transition-colors'

export function LibraryHomePage() {
  const { t } = useTranslation()
  const [pagina, setPagina] = useState(1)
  const { data, isPending, isError, error } = useBooks(pagina)

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">
          {t('library:home.title')}
        </h1>
        <p className="mt-2 text-stone-300">{t('library:home.subtitle')}</p>
      </header>

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

      {!isPending && !isError && (
        <>
          {data.noDisponibles.length > 0 && (
            <p className="mb-6 flex items-start gap-2.5 rounded-xl border border-yellow-600/40 bg-yellow-600/10 px-4 py-3 text-stone-300">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-yellow-500" />
              Algunos libros no están disponibles en este momento.
            </p>
          )}

          <Libros libros={data.libros} />

          <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setPagina((actual) => Math.max(1, actual - 1))}
              disabled={pagina === 1}
              className={BOTON}
            >
              <ChevronLeft className="size-4" />
              Anterior
            </button>

            <p className="text-sm text-stone-400">Página {pagina}</p>

            <button
              type="button"
              onClick={() => setPagina((actual) => actual + 1)}
              disabled={!data.hayMas}
              className={BOTON}
            >
              Siguiente
              <ChevronRight className="size-4" />
            </button>
          </nav>
        </>
      )}
    </>
  )
}
