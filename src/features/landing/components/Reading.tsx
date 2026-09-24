import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

import { PATHS } from '../../../router'
import data from '../data.json'

/** Último empujón antes del footer: invita a entrar y empezar a leer. */
export function Reading() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="rounded-lg bg-stone-300 p-8 text-center text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-12">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{data.Reading.title}</h2>
          <p className="mx-auto mt-4 max-w-prose text-lg text-stone-600">
            {data.Reading.description}
          </p>

          <Link
            to={PATHS.login}
            className="mt-8 inline-flex items-center gap-2.5 rounded-md bg-yellow-600 px-6 py-3 font-serif text-lg font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:-translate-y-0.5 hover:bg-rose-900 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 motion-safe:transition-all"
          >
            {data.Reading.buttonLabel}
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}