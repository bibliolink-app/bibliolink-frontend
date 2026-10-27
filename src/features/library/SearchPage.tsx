import { useMemo, useState } from 'react'
import { CircleAlert, Search, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { LibrosSkeleton } from '../book/components/LibrosSkeleton'
import { Paginacion } from '../book/components/Paginacion'
import { SelectorCategorias } from '../book/components/SelectorCategorias'
import { useBooks } from '../book/Hook/BookHook'
import { bookErrorMessage } from '../book/lib/bookErrorMessage'
import { categoriasDeLibros, filtrarPorCategoria } from '../book/lib/categorias'
import { filtrarLibros } from '../book/lib/filtrarLibros'
import { paginar, totalDePaginas } from '../book/lib/paginar'

export function SearchPage() {
  const { t, i18n } = useTranslation()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [pagina, setPagina] = useState(1)
  const { data: libros, isPending, isError, error } = useBooks()

  const categorias = useMemo(
    () => categoriasDeLibros(libros ?? [], i18n.language, t),
    [libros, i18n.language, t],
  )

  const resultados = useMemo(
    () => filtrarLibros(filtrarPorCategoria(libros ?? [], categoria), busqueda),
    [libros, categoria, busqueda],
  )

  const totalPaginas = totalDePaginas(resultados.length)
  const visibles = paginar(resultados, pagina)

  // Al cambiar los filtros se vuelve a la primera página: si estabas en la 4
  // y el resultado nuevo tiene 2, quedarías mirando una página vacía.
  const cambiarBusqueda = (valor: string) => {
    setBusqueda(valor)
    setPagina(1)
  }

  const cambiarCategoria = (code: string) => {
    setCategoria(code)
    setPagina(1)
  }

  const buscando = busqueda.trim() !== ''
  const sinResultados = resultados.length === 0 && (buscando || categoria !== '')

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-stone-100 sm:text-5xl">
          {t('library:search.title')}
        </h1>
        <p className="mt-3 text-lg text-stone-300">{t('library:search.subtitle')}</p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1 sm:max-w-xl">
          <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={busqueda}
            onChange={(event) => cambiarBusqueda(event.target.value)}
            placeholder={t('library:search.placeholder')}
            aria-label={t('library:search.ariaLabel')}
            className="w-full rounded-xl border border-stone-100/15 bg-teal-900/40 py-3.5 pr-4 pl-12 text-base text-stone-100 placeholder:text-stone-400 hover:border-yellow-600/50 focus-visible:border-yellow-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 motion-safe:transition-colors"
          />
        </div>

        <SelectorCategorias categorias={categorias} valor={categoria} onChange={cambiarCategoria} />
      </div>

      <div className="mt-8">
        {isPending && <LibrosSkeleton />}

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
              <>
                <Libros libros={visibles} />
                <Paginacion pagina={pagina} totalPaginas={totalPaginas} onCambiar={setPagina} />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}