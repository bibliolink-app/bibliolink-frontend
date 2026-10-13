import { useTranslation } from 'react-i18next'

import { LoginButton } from './LoginButton'

/** Último empujón antes del footer: invita a entrar y empezar a leer. */
export function Reading() {
  const { t } = useTranslation()

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-lg bg-stone-300 p-6 text-center text-stone-900 shadow-lg shadow-black/20 ring-1 ring-black/25 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('landing:reading.title')}</h2>
          <p className="mx-auto mt-3 max-w-prose text-stone-600">
            {t('landing:reading.description')}
          </p>

          <div className="mt-6">
            <LoginButton />
          </div>
        </div>
      </div>
    </section>
  )
}
