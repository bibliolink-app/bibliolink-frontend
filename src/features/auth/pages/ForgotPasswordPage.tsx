import { useTranslation } from 'react-i18next'

import { CenteredCard } from '../../../ui/CenteredCard'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

export function ForgotPasswordPage() {
  const { t } = useTranslation()

  return (
    <CenteredCard title={t('auth:forgotPassword.title')} description={t('auth:forgotPassword.description')}>
      <ForgotPasswordForm />
    </CenteredCard>
  )
}
