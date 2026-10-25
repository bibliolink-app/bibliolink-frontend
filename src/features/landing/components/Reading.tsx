import { Link } from 'react-router'
import { UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'

/** Último empujón antes del footer: invita a entrar y empezar a leer. */
export function Reading() {
  const { t } = useTranslation()

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-2xl px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-100 sm:text-4xl">
          {t('landing:reading.title')}
        </h2>

        <p className="mx-auto mt-3 max-w-prose text-lg text-stone-300">
          {t('landing:reading.description')}
        </p>

        <Link
          to={PATHS.register}
          className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-yellow-600 px-7 py-3.5 font-serif font-bold tracking-wide text-teal-950 shadow-lg shadow-black/30 hover:-translate-y-0.5 hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-all"
        >
          <UserPlus className="size-5" />
          {t('landing:reading.buttonLabel')}
        </Link>
      </div>
    </section>
  )
}
