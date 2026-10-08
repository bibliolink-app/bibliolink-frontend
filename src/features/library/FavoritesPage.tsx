import { CircleAlert, Library } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Libros } from '../book/components/Libros'
import { useFavoritos } from '../favoritebook/Hook/FavoritesHook'
import { favoritesErrorMessage } from '../favoritebook/lib/FavoritesErrorMessage'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

export function FavoritesPage() {
  const { t } = useTranslation()
  const { data, isPending, isError, error } = useFavoritos()

  const libros = data?.items.map((favorito) => favorito.book) ?? []

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">
          {t('library:favorites.title')}
        </h1>
        <p className="mt-2 text-stone-300">{t('library:favorites.subtitle')}</p>
      </header>

      {isPending && <LoadingScreen />}

      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{favoritesErrorMessage(error)}</p>
        </div>
      )}

      {data && (
        <>
          <p className="mb-6 text-sm text-stone-400">
            {data.count} de {data.limit} favoritos
            {data.plan === 'FREE' && ' · Hazte Premium para guardar hasta 50'}
          </p>

          {libros.length === 0 ? (
            <div className="grid place-items-center gap-3 rounded-lg bg-stone-300 px-4 py-14 text-center">
              <Library className="size-10 text-stone-600" />
              <p className="font-serif text-xl font-semibold text-stone-900">
                {t('library:favorites.empty')}
              </p>
            </div>
          ) : (
            <Libros libros={libros} />
          )}
        </>
      )}
    </>
  )
}