import { ChevronDown, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ICONS } from '../icons'
import type { LandingPremium, LandingStep } from '../types'


const CON_CONECTOR = new Set([0, 1, 3])

export function AboutSection() {
  const { t } = useTranslation()
  const steps = t('landing:about.steps', { returnObjects: true }) as LandingStep[]
  const premium = t('landing:about.premium', { returnObjects: true }) as LandingPremium

  return (
    <section id="que-es" className="scroll-mt-20 bg-stone-300 py-20 text-stone-900 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{t('landing:about.title')}</h2>
        <p className="mt-4 max-w-prose text-lg text-stone-600">{t('landing:about.description')}</p>

        <div className="mt-20 text-center">
          <h3 className="font-serif text-3xl font-semibold sm:text-4xl">
            {t('landing:about.stepsTitle')}
          </h3>
          <p className="mx-auto mt-3 max-w-prose text-lg text-stone-600">
            {t('landing:about.stepsSubtitle')}
          </p>
        </div>

        {/* Seis columnas con tarjetas de ancho 2: caben 3 por fila. La cuarta
            arranca en la columna 2 para que la fila de abajo quede centrada. */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-8">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon]

            return (
              <li
                key={step.title}
                className={`relative lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''}`}
              >
                <article className="h-full rounded-2xl bg-stone-100 p-6 shadow-sm shadow-black/5 ring-1 ring-stone-500/15 hover:-translate-y-0.5 hover:shadow-md motion-safe:transition-all">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/30">
                      <Icon className="size-5" />
                    </span>

                    <span className="font-serif text-3xl leading-none font-bold tabular-nums text-yellow-700/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4 className="mt-4 font-serif text-lg font-semibold">{step.title}</h4>
                  <p className="mt-1.5 text-sm text-stone-600">{step.description}</p>
                </article>

                {CON_CONECTOR.has(index) && (
                  <ChevronRight
                    aria-hidden
                    className="absolute top-1/2 -right-7 hidden size-5 -translate-y-1/2 text-yellow-700/40 lg:block"
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div aria-hidden className="mt-12 flex justify-center">
          <ChevronDown className="size-7 text-yellow-700/40" />
        </div>

        <article className="mt-6 rounded-2xl bg-teal-950 p-7 text-stone-100 shadow-lg shadow-black/15 ring-1 ring-yellow-600/30 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-yellow-600/20 text-yellow-500 ring-1 ring-yellow-600/40">
                <ICONS.Sparkles className="size-5" />
              </span>

              <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{premium.title}</h3>
            </div>

            <span className="rounded-full bg-yellow-600 px-3.5 py-1.5 text-xs font-bold tracking-wide text-stone-900 uppercase">
              {premium.badge}
            </span>
          </div>

          <p className="mt-5 max-w-prose text-stone-300">{premium.description}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {premium.items.map((item) => {
              const Icon = ICONS[item.icon]

              return (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-teal-800 bg-teal-900/40 px-4 py-4"
                >
                  <Icon className="size-5 shrink-0 text-yellow-500" />
                  <span className="text-sm font-semibold">{item.title}</span>
                </li>
              )
            })}
          </ul>
        </article>
      </div>
    </section>
  )
}
