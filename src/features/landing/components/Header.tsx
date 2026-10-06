import { useTranslation } from 'react-i18next'

import { Logo } from '../../../ui/Logo'
import { LanguageSwitcher } from '../../../ui/LanguageSwitcher'
import { LoginButton } from './LoginButton'


export function Header() {
  const { t } = useTranslation()
  const navItems = t('landing:nav.items', { returnObjects: true }) as { label: string; href: string }[]

  return (
    <header className="sticky top-0 z-20 border-b border-yellow-600/30 bg-teal-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo size="sm" />

        <nav aria-label={t('landing:nav.ariaSections')} className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <LoginButton />
        </div>
      </div>
    </header>
  )
}
