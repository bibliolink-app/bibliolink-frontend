import { useTranslation } from 'react-i18next'

import logo from '../../../assets/bibliolink.jpeg'


export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:py-28 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-wide text-stone-100 sm:text-6xl">
          {t('landing:hero.title')}
        </h1>

        <p className="mt-4 font-serif text-xl text-yellow-500 sm:text-2xl">{t('landing:hero.subtitle')}</p>

        <p className="mt-6 max-w-prose text-lg text-stone-300">{t('landing:hero.description')}</p>
      </div>

      {/* Logotipo decorativo: el nombre de la marca ya aparece en el título. */}
      <div className="hidden place-items-center md:grid">
        <img
          src={logo}
          alt=""
          aria-hidden
          className="aspect-square w-full max-w-xs rounded-full object-cover shadow-2xl shadow-black/40 ring-4 ring-yellow-600/30"
        />
      </div>
    </section>
  )
}
