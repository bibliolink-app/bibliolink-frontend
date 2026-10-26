import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { ICONS } from '../icons'
import type { LandingPremium, LandingStep } from '../types'

/** Explica qué es Biblio Link y el recorrido que hace el usuario dentro de la plataforma. */
export function AboutSection() {
  const { t } = useTranslation()
  const steps = t('landing:about.steps', { returnObjects: true }) as LandingStep[]
  const premium = t('landing:about.premium', { returnObjects: true }) as LandingPremium

  return (
    <section id="que-es" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-stone-100 sm:text-4xl">
            {t('landing:about.stepsTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-lg text-stone-300">
            {t('landing:about.stepsSubtitle')}
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon]

            return (
              <li key={step.title}>
                <article className="flex h-full items-start gap-5 rounded-2xl bg-teal-900/40 p-6 ring-1 ring-stone-100/10 hover:-translate-y-0.5 hover:ring-yellow-600/40 motion-safe:transition-all">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-yellow-600/15 text-yellow-500">
                    <Icon className="size-6" />
                  </span>

                  <div className="min-w-0">
                    <span className="font-serif text-xl font-bold tabular-nums text-yellow-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-0.5 font-serif text-lg font-bold text-stone-100">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-stone-300">{step.description}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>

        {/* Verde más profundo que el fondo, con un borde dorado: destaca del
            resto sin romper la paleta, como sí hacía una tarjeta blanca. */}
        <article className="mt-10 rounded-3xl bg-teal-900/60 p-8 shadow-2xl shadow-black/40 ring-1 ring-yellow-600/40 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <h3 className="font-serif text-3xl font-bold text-stone-100 sm:text-4xl">
                {premium.title}
              </h3>
              <p className="mt-2 max-w-prose text-stone-300">{premium.description}</p>
            </div>

            <Link
              to={PATHS.register}
              className="shrink-0 rounded-full bg-yellow-600 px-5 py-2.5 font-serif font-bold text-teal-950 shadow-md shadow-black/25 hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
            >
              {premium.badge}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-4">
            {premium.items.map((item) => {
              const Icon = ICONS[item.icon]

              return (
                <li
                  key={item.title}
                  className="flex items-center gap-2.5 rounded-xl border border-yellow-600/35 bg-teal-950/40 px-5 py-3"
                >
                  <Icon className="size-5 shrink-0 text-yellow-500" />
                  <span className="text-sm font-semibold text-stone-100">{item.title}</span>
                </li>
              )
            })}
          </ul>
        </article>
      </div>
    </section>
  )
}
