import { Link } from 'react-router'
import { BookOpen, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 md:grid-cols-2">
      <div>
        {/* Antetítulo: una línea dorada y el nombre de la sección. */}
        <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">
          <span aria-hidden className="h-px w-8 bg-yellow-500/50" />
          {t('landing:hero.subtitle')}
        </p>

        <h1 className="mt-5 font-serif text-4xl leading-tight font-bold text-stone-100 sm:text-5xl">
          {t('landing:hero.title')}
        </h1>

        <p className="mt-5 max-w-prose text-lg text-stone-300">{t('landing:hero.description')}</p>

        <Link
          to={PATHS.login}
          className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-yellow-600 px-6 py-3.5 font-serif font-bold tracking-wide text-teal-950 shadow-lg shadow-black/30 hover:-translate-y-0.5 hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-all"
        >
          <BookOpen className="size-5" />
          {t('landing:hero.loginLabel')}
        </Link>
      </div>

      {/* Composición decorativa: el título ya dice de qué trata la página. */}
      <div aria-hidden className="relative grid place-items-center py-8">
        <span className="absolute size-64 rounded-full bg-yellow-600/10 blur-3xl sm:size-80" />

        <span className="relative grid size-56 place-items-center rounded-full border border-yellow-600/25 bg-teal-900/30 sm:size-72">
          <span className="grid size-40 place-items-center rounded-full border border-yellow-600/20 sm:size-52">
            <BookOpen className="size-20 text-yellow-500 sm:size-28" strokeWidth={1.25} />
          </span>
        </span>

        <Sparkles className="absolute top-6 right-10 size-6 text-yellow-500/70 sm:size-7" />
        <Sparkles className="absolute bottom-10 left-8 size-4 text-yellow-500/50 sm:size-5" />
      </div>
    </section>
  )
}
