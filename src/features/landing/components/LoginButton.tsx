import { Link } from 'react-router'
import { LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'

interface LoginButtonProps {
  /** En la barra superior el espacio es corto: deja solo el icono en pantallas chicas. */
  soloIconoEnMovil?: boolean
}

export function LoginButton({ soloIconoEnMovil = false }: LoginButtonProps) {
  const { t } = useTranslation()
  const label = t('landing:hero.loginLabel')

  return (
    <Link
      to={PATHS.login}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border border-stone-100/30 px-4 py-2 font-serif font-semibold text-stone-100 hover:border-yellow-500 hover:text-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
    >
      <LogIn className="size-5 shrink-0" />
      <span className={soloIconoEnMovil ? 'hidden sm:inline' : undefined}>{label}</span>
    </Link>
  )
}
