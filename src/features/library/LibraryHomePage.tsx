import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { useBooks } from '../book/Hook/BookHook'
import { bookErrorMessage } from '../book/lib/bookErrorMessage'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

export function LibraryHomePage() {
  const { t } = useTranslation()

  const { data: libros, isPending, isError, error } = useBooks()
 
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

      {!isPending && !isError && <Libros libros={libros} />}
    
        
    </>
    
  )
}
