import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Logo } from '../../../components/ui/Logo'
import { PATHS } from '../../../router'

export function Footer() {
  const { t } = useTranslation()
  const navItems = t('landing:nav.items', { returnObjects: true }) as { label: string; href: string }[]

  return (
    <footer className="border-t border-yellow-600/30 bg-teal-950 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-stone-400">{t('landing:footer.description')}</p>
        </div>

        <nav
          aria-label={t('landing:nav.ariaFooterLinks')}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:border-l sm:border-stone-100/15 sm:pl-10"
        >
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
            className="text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
          >
            {t('landing:hero.loginLabel')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
