import { useTranslation } from 'react-i18next'

import { Logo } from './Logo'

export function LoadingScreen() {
  const { t } = useTranslation()

  return (
    <div className="bg-linear-to-b from-mist-700 to-teal-950 grid flex-1 place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <Logo asLink={false} />
        <p className="font-serif text-lg text-stone-300">{t('common:loading')}</p>
      </div>
    </div>
  )
}
