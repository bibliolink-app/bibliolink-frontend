import { useMemo, useState } from 'react'
import { CircleAlert, Search, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { SelectorCategorias } from '../book/components/SelectorCategorias'
import { useBooks } from '../book/Hook/BookHook'
import { bookErrorMessage } from '../book/lib/bookErrorMessage'
import { categoriasDeLibros, filtrarPorCategoria } from '../book/lib/categorias'
import { filtrarLibros } from '../book/lib/filtrarLibros'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

export function SearchPage() {
  const { t, i18n } = useTranslation()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const { data: libros, isPending, isError, error } = useBooks()

  const categorias = useMemo(
    () => categoriasDeLibros(libros ?? [], i18n.language),
    [libros, i18n.language],
  )

  const resultados = useMemo(
    () => filtrarLibros(filtrarPorCategoria(libros ?? [], categoria), busqueda),
    [libros, categoria, busqueda],
  )

  const buscando = busqueda.trim() !== ''
  const sinResultados = resultados.length === 0 && (buscando || categoria !== '')

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">
          {t('library:search.title')}
        </h1>
        <p className="mt-2 text-stone-300">{t('library:search.subtitle')}</p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1 sm:max-w-xl">
          <Search className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone-600" />
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder={t('library:search.placeholder')}
            aria-label={t('library:search.ariaLabel')}
            className="w-full rounded-md border border-stone-500 bg-stone-100 py-3 pr-3.5 pl-11 text-base text-stone-900 shadow-inner shadow-black/5 hover:border-yellow-800 focus-visible:border-yellow-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 motion-safe:transition-colors"
          />
        </div>

        <SelectorCategorias categorias={categorias} valor={categoria} onChange={setCategoria} />
      </div>

      <div className="mt-8">
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
            <p aria-live="polite" className="mb-5 text-sm text-stone-400">
              {t('library:search.resultCount', { count: resultados.length })}
              {categoria !== '' &&
                ` ${t('library:search.inCategory', { category: categorias.find((c) => c.code === categoria)?.nombre ?? '' })}`}
              {buscando && ` ${t('library:search.forQuery', { query: busqueda.trim() })}`}
            </p>

            {sinResultados ? (
              <div className="flex flex-col items-center gap-3 rounded-xl bg-stone-100/10 px-4 py-16 text-center ring-1 ring-stone-100/15">
                <SearchX className="size-9 text-stone-400" />
                <p className="text-stone-300">{t('library:search.noResults')}</p>
              </div>
            ) : (
              <Libros libros={resultados} />
            )}
          </>
        )}
      </div>
    </>
  )
}