import { Link } from 'react-router'
import { LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'


export function LoginButton() {
  const { t } = useTranslation()

  return (
    <Link
      to={PATHS.login}
      className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
    >
      <LogIn className="size-5" />
      {t('landing:hero.loginLabel')}
    </Link>
  )
}
