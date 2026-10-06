import { Library } from 'lucide-react'
import { useTranslation } from 'react-i18next'


export function FavoritesPage() {
  const { t } = useTranslation()

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('library:favorites.title')}</h1>
        <p className="mt-2 text-stone-300">{t('library:favorites.subtitle')}</p>
      </header>

      <div className="grid place-items-center gap-3 rounded-lg bg-stone-300 px-4 py-14 text-center">
        <Library className="size-10 text-stone-600" />
        <p className="font-serif text-xl font-semibold text-stone-900">{t('library:favorites.empty')}</p>
      </div>
    </>
  )
}
