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
      className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-3 py-2 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors sm:px-4"
    >
      <LogIn className="size-5" />
      <span className={soloIconoEnMovil ? 'hidden sm:inline' : undefined}>{label}</span>
    </Link>
  )
}
