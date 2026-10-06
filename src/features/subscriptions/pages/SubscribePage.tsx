import { useTranslation } from 'react-i18next'

import { PlanCard } from '../components/PlanCard'
import { SubscribeButton } from '../components/SubscribeButton'
import { useEntitlements } from '../hooks/useEntitlements'

function formatPeriodEnd(currentPeriodEnd: string | null, locale: string): string | null {
  if (!currentPeriodEnd) return null
  return new Date(currentPeriodEnd).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
}

export function SubscribePage() {
  const { t, i18n } = useTranslation()
  const { entitlement, hasPremiumAccess } = useEntitlements()
  const isPending = entitlement.status === 'PENDING'
  const isProCurrent = hasPremiumAccess || isPending
  const periodEnd = formatPeriodEnd(entitlement.currentPeriodEnd, i18n.resolvedLanguage ?? i18n.language)

  const freeFeatures = t('subscriptions:plans.free.features', { returnObjects: true }) as string[]
  const proFeatures = t('subscriptions:plans.pro.features', { returnObjects: true }) as string[]

  return (
    <div className="max-w-3xl">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('subscriptions:plans.pageTitle')}</h1>
        <p className="mt-2 text-stone-300">{t('subscriptions:plans.pageSubtitle')}</p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <PlanCard
          name={t('subscriptions:plans.free.name')}
          price={t('subscriptions:plans.free.price')}
          features={freeFeatures}
          isCurrent={!isProCurrent}
        />

        <PlanCard
          name={t('subscriptions:plans.pro.name')}
          price={t('subscriptions:plans.pro.price')}
          features={proFeatures}
          isCurrent={isProCurrent}
          action={
            hasPremiumAccess ? (
              periodEnd && (
                <p className="text-sm text-stone-600">
                  {entitlement.status === 'CANCELED'
                    ? t('subscriptions:plans.activeUntil', { date: periodEnd })
                    : t('subscriptions:plans.renewsOn', { date: periodEnd })}
                </p>
              )
            ) : isPending ? (
              <p className="text-sm text-stone-600">{t('subscriptions:plans.paymentPending')}</p>
            ) : (
              <div className="cursor-not-allowed">
                <div className="pointer-events-none opacity-60">
                  <SubscribeButton />
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  )
}
