import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface PlanCardProps {
  name: string
  price: string
  features: string[]
  isCurrent: boolean
  action?: ReactNode
}

export function PlanCard({ name, price, features, isCurrent, action }: PlanCardProps) {
  const { t } = useTranslation()

  return (
    <article
      className={
        isCurrent
          ? 'flex flex-col gap-4 rounded-lg bg-teal-950/70 p-6 text-stone-900 shadow-xl ring-2 ring-yellow-600 sm:p-8'
          : 'flex flex-col gap-4 rounded-lg bg-teal-950/70 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-8'
      }
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-2xl font-semibold text-stone-100">{name}</h2>
        {isCurrent && (
          <span className="rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold text-stone-900">
            {t('subscriptions:plans.currentPlanBadge')}
          </span>
        )}
      </div>

      <p className="text-stone-300">{price}</p>

      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-stone-200">
            <Check className="size-4 shrink-0 text-yellow-600" />
            {feature}
          </li>
        ))}
      </ul>

      {action && <div className="mt-auto pt-2">{action}</div>}
    </article>
  )
}
