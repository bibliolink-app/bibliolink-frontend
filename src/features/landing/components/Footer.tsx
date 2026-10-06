import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'

export function Footer() {
  const { t } = useTranslation()
  const navItems = t('landing:nav.items', { returnObjects: true }) as { label: string; href: string }[]

  return (
    <footer className="border-t border-yellow-600/30 bg-teal-950 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-xl font-bold tracking-wide text-stone-100">
            {t('landing:footer.title')}
          </p>
          <p className="mt-1.5 max-w-prose text-sm text-stone-300">{t('landing:footer.description')}</p>
        </div>

        <nav aria-label={t('landing:nav.ariaFooterLinks')} className="flex flex-wrap gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            to={PATHS.login}
            className="text-sm font-semibold text-yellow-500 hover:text-stone-100 motion-safe:transition-colors"
          >
            {t('landing:hero.loginLabel')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}