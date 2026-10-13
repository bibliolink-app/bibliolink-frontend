import { Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { ResumenUsuarios } from '../Models/GraficosModels'


import { CHART_COLORS } from '../lib/chartColors'

function Cifra({ color, label, value }: { color?: string; label: string; value: number }) {
  const { i18n } = useTranslation()

  return (
    <div>
      <div className="flex items-center gap-2">
        {color && (
          <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        )}
        <p className="text-sm font-semibold text-stone-700">{label}</p>
      </div>

      <p className="mt-1.5 font-serif text-4xl leading-none font-bold tabular-nums text-stone-900">
        {value.toLocaleString(i18n.language)}
      </p>
    </div>
  )
}

/**
 * Totales de cuentas Premium y gratuitas.

 */
export function PremiumSummary({ data }: { data: ResumenUsuarios }) {
  const { t } = useTranslation()
  const { totalUsers, premiumUsers, freeUsers } = data

 
  const porcentajePremium = totalUsers === 0 ? 0 : Math.round((premiumUsers / totalUsers) * 100)

  return (
    <section className="rounded-2xl bg-stone-100 p-5 shadow-lg shadow-black/10 ring-1 ring-stone-500/15 sm:p-7">
      <header className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/25">
          <Crown className="size-5" />
        </span>

        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl">
            {t('graficos:premiumSummary.title')}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {t('graficos:premiumSummary.description')}
          </p>
        </div>
      </header>

      <div className="mt-7 flex flex-wrap gap-x-14 gap-y-6">
        <Cifra color={CHART_COLORS.premium} label={t('graficos:common.premium')} value={premiumUsers} />
        <Cifra color={CHART_COLORS.gratuito} label={t('graficos:common.free')} value={freeUsers} />
        <Cifra label={t('graficos:premiumSummary.total')} value={totalUsers} />
        <div>
          <p className="text-sm font-semibold text-stone-700">{t('graficos:premiumSummary.premiumOfTotal')}</p>
          <p className="mt-1.5 font-serif text-4xl leading-none font-bold tabular-nums text-stone-900">
            {porcentajePremium}%
          </p>
        </div>
      </div>

      
      <div
        role="img"
        aria-label={t('graficos:premiumSummary.ariaLabel', { premiumUsers, freeUsers, totalUsers })}
        className="mt-7 flex h-4 gap-0.5 overflow-hidden rounded-full bg-stone-200"
      >
        {premiumUsers > 0 && (
          <div
            className="h-full"
            style={{ width: `${porcentajePremium}%`, backgroundColor: CHART_COLORS.premium }}
          />
        )}
        {freeUsers > 0 && (
          <div
            className="h-full"
            style={{ width: `${100 - porcentajePremium}%`, backgroundColor: CHART_COLORS.gratuito }}
          />
        )}
      </div>

     
    </section>
  )
}
