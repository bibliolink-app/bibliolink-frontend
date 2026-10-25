import { useState } from 'react'
import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { LibrosSkeleton } from '../book/components/LibrosSkeleton'
import { Paginacion } from '../book/components/Paginacion'
import { useBooks } from '../book/Hook/BookHook'
import { bookErrorMessage } from '../book/lib/bookErrorMessage'
import { paginar, totalDePaginas } from '../book/lib/paginar'

export function LibraryHomePage() {
  const { t } = useTranslation()
  const [pagina, setPagina] = useState(1)
  const { data: libros, isPending, isError, error } = useBooks()

  const todos = libros ?? []
  const totalPaginas = totalDePaginas(todos.length)
  const visibles = paginar(todos, pagina)

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">
          {t('library:home.title')}
        </h1>
        <p className="mt-2 text-stone-300">{t('library:home.subtitle')}</p>
      </header>

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
          <Libros libros={visibles} />
          <Paginacion pagina={pagina} totalPaginas={totalPaginas} onCambiar={setPagina} />
        </>
      )}
    </>
  )
}