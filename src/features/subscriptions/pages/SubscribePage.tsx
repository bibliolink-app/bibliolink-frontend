import { useTranslation } from 'react-i18next'

import { PlanCard } from '../components/PlanCard'
import { SubscribeButton } from '../components/SubscribeButton'
import { useEntitlements } from '../hooks/useEntitlements'

export function SubscribePage() {
  const { t } = useTranslation()
  const { hasPremiumAccess } = useEntitlements()

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
          isCurrent={!hasPremiumAccess}
        />

        <PlanCard
          name={t('subscriptions:plans.pro.name')}
          price={t('subscriptions:plans.pro.price')}
          features={proFeatures}
          isCurrent={hasPremiumAccess}
          action={
            !hasPremiumAccess && (
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
