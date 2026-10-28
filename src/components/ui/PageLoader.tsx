import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Fallback de `Suspense` mientras se descarga el código de una página. */
export function PageLoader() {
  const { t } = useTranslation()

  return (
    <div role="status" aria-live="polite" className="flex flex-1 items-center justify-center py-20">
      <LoaderCircle aria-hidden className="size-8 text-yellow-500 motion-safe:animate-spin" />
      <span className="sr-only">{t('common:layout.loading')}</span>
    </div>
  )
}
