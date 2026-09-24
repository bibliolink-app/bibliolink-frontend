import data from '../data.json'
import type { LandingCardSection } from '../types'

/** Sección de beneficios. Reutiliza la misma tarjeta que Características. */
export function BenefitsSection() {
  const { title, description, items } = data.benefits as LandingCardSection

  return (
    <section id="beneficios" className="scroll-mt-20 bg-teal-900/40 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-prose text-lg text-stone-300">{description}</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title}>
              <article className="h-full rounded-2xl border border-teal-700/50 bg-teal-950/50 p-6">
                <h3 className="font-serif text-xl font-semibold text-stone-100">{item.title}</h3>
                <p className="mt-3 text-stone-300">{item.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}