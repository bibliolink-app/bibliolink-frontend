import { ChevronRight } from 'lucide-react'

import data from '../data.json'
import { ICONS } from '../icons'
import type { LandingStep } from '../types'

/** Explica qué es Biblio Link y los pasos para llegar al catálogo. */
export function AboutSection() {
  const steps = data.about.steps as LandingStep[]

  return (
    <section id="que-es" className="scroll-mt-20 bg-stone-300 py-20 text-stone-900 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{data.about.title}</h2>
        <p className="mt-4 max-w-prose text-lg text-stone-600">{data.about.description}</p>

        <h3 className="mt-14 font-serif text-2xl font-semibold">{data.about.stepsTitle}</h3>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = ICONS[step.icon]
            const isLast = index === steps.length - 1

            return (
              <li key={step.title} className="relative">
                <article className="h-full rounded-lg bg-stone-100 p-5 shadow-sm ring-1 ring-stone-500/20 hover:shadow-md motion-safe:transition-shadow">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/30">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-serif text-2xl font-bold text-yellow-700">{index + 1}</span>
                  </div>

                  <h4 className="mt-3 font-serif text-lg font-semibold">{step.title}</h4>
                  <p className="mt-1 text-sm text-stone-600">{step.description}</p>
                </article>

                {/* Conector entre pasos. Solo en escritorio, donde la fila es horizontal. */}
                {!isLast && (
                  <ChevronRight
                    aria-hidden
                    className="absolute top-1/2 -right-6 hidden size-5 -translate-y-1/2 text-yellow-700/50 lg:block"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}