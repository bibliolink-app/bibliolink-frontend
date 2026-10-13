import { Link } from 'react-router'
import { ArrowLeft, CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { PremiumChart } from '../components/PremiumChart'
import { PremiumSummary } from '../components/PremiumSummary'
import { useSummary } from '../Hook/GraficosHook'
import { analyticsErrorMessage } from '../lib/AnalyticsErrorMessage'

export function PremiumPage() {
  const { t } = useTranslation()
  const { data, isPending, isError, error } = useSummary()

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to={PATHS.adminAnalytics}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        {t('graficos:premiumPage.backToUsers')}
      </Link>

      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
          {t('graficos:premiumPage.title')}
        </h1>
        <p className="mt-2.5 text-stone-300">
          {t('graficos:premiumPage.subtitle')}
        </p>
      </header>

      {isPending && <LoadingScreen />}

      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{analyticsErrorMessage(error)}</p>
        </div>
      )}

      {!isPending && !isError && (
        <div className="space-y-8">
          <PremiumSummary data={data} />
          <PremiumChart data={data} />
        </div>
      )}
    </div>
  )
}
