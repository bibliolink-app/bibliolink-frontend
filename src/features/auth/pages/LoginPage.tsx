import { CircleCheck } from 'lucide-react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { CenteredCard } from '../../../components/ui/CenteredCard'
import { TextLink } from '../../../components/ui/TextLink'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const { t } = useTranslation()
  const { state } = useLocation()

  // Al terminar de restablecer la contraseña se llega aquí con `state.passwordReset`.
  const passwordReset =
    typeof state === 'object' && state !== null && 'passwordReset' in state && state.passwordReset === true

  return (
    <CenteredCard title={t('auth:login.welcomeTitle')} description={t('auth:login.welcomeDescription')}>
      {passwordReset && (
        <div
          role="status"
          className="mb-5 flex items-start gap-2.5 rounded-md border border-emerald-300 bg-emerald-50 px-3.5 py-3 text-sm font-medium text-emerald-900"
        >
          <CircleCheck className="mt-0.5 size-5 shrink-0" />
          <p>{t('auth:login.passwordResetSuccess')}</p>
        </div>
      )}

      <LoginForm />

      <p className="mt-7 border-t border-stone-500/30 pt-5 text-center text-sm text-stone-600">
        {t('auth:login.noAccount')} <TextLink to={PATHS.register}>{t('auth:login.createAccount')}</TextLink>
      </p>
    </CenteredCard>
  )
}
