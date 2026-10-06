import { useTranslation } from 'react-i18next'

import { FeatureCard } from '../../../components/ui/FeatureCard'
import { ICONS } from '../icons'
import type { LandingCardSection } from '../types'

/** Sección de características, alimentada desde las traducciones. */
export function FeaturesSection() {
  const { t } = useTranslation()
  const { title, description, items } = t('landing:features', { returnObjects: true }) as LandingCardSection

  return (
    <section id="caracteristicas" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-prose text-lg text-stone-300">{description}</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = ICONS[item.icon]

            return (
              <li key={item.title}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={<Icon className="size-6" />}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}