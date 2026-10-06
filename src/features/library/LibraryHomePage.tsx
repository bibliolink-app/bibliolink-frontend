import { useTranslation } from 'react-i18next'

/**
 * Inicio del lector: aquí irá el catálogo de libros.
 * Pendiente del endpoint del backend, que consumirá la API externa de libros.
 */
export function LibraryHomePage() {
  const { t } = useTranslation()

  return (
    <header className="max-w-2xl">
      <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('library:home.title')}</h1>
      <p className="mt-2 text-stone-300">{t('library:home.subtitle')}</p>
    </header>
  )
}
