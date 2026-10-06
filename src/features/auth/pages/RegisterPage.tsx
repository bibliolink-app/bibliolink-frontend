import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { CenteredCard } from '../../../ui/CenteredCard'
import { TextLink } from '../../../ui/TextLink'
import { RegisterForm } from '../components/RegisterForm'

export function RegisterPage() {
  const { t } = useTranslation()

  return (
    <CenteredCard title={t('auth:register.title')} description={t('auth:register.description')}>
      <RegisterForm />

      <p className="mt-7 border-t border-stone-500/30 pt-5 text-center text-sm text-stone-600">
        {t('auth:register.haveAccount')} <TextLink to={PATHS.login}>{t('auth:register.login')}</TextLink>
      </p>
    </CenteredCard>
  )
}
