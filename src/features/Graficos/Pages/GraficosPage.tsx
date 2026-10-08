import { Link } from 'react-router'
import { ArrowLeft, ChevronRight, CircleAlert, Crown, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { RegistrationsChart } from '../components/RegistrationsChart'
import { RegistrationsTable } from '../components/RegistrationsTable'
import { StatTile } from '../components/CardTotalUsuarios'
import { useRegistrations } from '../Hook/GraficosHook'
import { analyticsErrorMessage } from '../lib/AnalyticsErrorMessage'

export function GraficosPage() {
  const { t } = useTranslation()

  const porMes = useRegistrations('month')
  const porSemana = useRegistrations('week')

  const isPending = porMes.isPending || porSemana.isPending
  const isError = porMes.isError || porSemana.isError
  const error = porMes.error ?? porSemana.error

 
  const total = (porMes.data ?? []).reduce((suma, item) => suma + item.users, 0)

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to={PATHS.admin}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        {t('admin:common.backToPanel')}
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <header className="max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
            {t('graficos:page.title')}
          </h1>
          <p className="mt-2.5 text-stone-300">
            {t('graficos:page.subtitle')}
          </p>
          <p className="text-stone-300">{t('graficos:page.subtitleNote')}</p>
        </header>

        <Link
          to={PATHS.adminAnalyticsPremium}
          className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2.5 font-semibold text-stone-900 shadow-md shadow-black/20 hover:bg-rose-900 hover:text-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
        >
          <Crown className="size-5" />
          {t('graficos:page.premiumLink')}
          <ChevronRight className="size-4" />
        </Link>
      </div>

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
        // `space-y-8` separa los bloques: cada tarjeta respira sin márgenes sueltos.
        <div className="space-y-8">
          <div className="max-w-md">
            <StatTile
              label={t('graficos:stats.totalLabel')}
              value={total}
              hint={t('graficos:stats.totalHint')}
              icon={<Users className="size-6" />}
            />
          </div>

          {/* Una tarjeta por gráfica, apiladas a todo el ancho. */}
          <RegistrationsChart
            data={porMes.data}
            period="month"
            title={t('graficos:charts.byMonth.title')}
            description={t('graficos:charts.byMonth.description')}
          >
            <RegistrationsTable data={porMes.data} period="month" />
          </RegistrationsChart>

          <RegistrationsChart
            data={porSemana.data}
            period="week"
            title={t('graficos:charts.byWeek.title')}
            description={t('graficos:charts.byWeek.description')}
          >
            <RegistrationsTable data={porSemana.data} period="week" />
          </RegistrationsChart>
        </div>
      )}
    </div>
  )
}
