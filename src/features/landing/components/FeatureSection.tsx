import { FeatureCard } from '../../../ui/FeatureCard'
import data from '../data.json'
import { ICONS } from '../icons'
import type { LandingCardSection } from '../types'

/** Sección de características, alimentada desde el data.json. */
export function FeaturesSection() {
  const { title, description, items } = data.features as LandingCardSection

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