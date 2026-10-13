import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { CenteredCard } from '../../../components/ui/CenteredCard'
import { TextLink } from '../../../components/ui/TextLink'
import { ResetPasswordForm } from '../components/ResetPasswordForm'

// El backend genera el token con 32 bytes en hexadecimal: 64 caracteres. Si no tiene esa forma, ni se intenta.
const TOKEN_FORMAT = /^[0-9a-f]{64}$/i

export function ResetPasswordPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const hasValidToken = TOKEN_FORMAT.test(token)

  return (
    <CenteredCard
      title={hasValidToken ? t('auth:resetPassword.title') : t('auth:resetPassword.titleInvalid')}
      description={hasValidToken ? t('auth:resetPassword.description') : t('auth:resetPassword.descriptionInvalid')}
    >
      {/* El token viaja en la URL: que no se filtre a otros sitios por la cabecera Referer. React 19 lo sube al <head>. */}
      <meta name="referrer" content="no-referrer" />

      {hasValidToken ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-center">
          <TextLink to={PATHS.forgotPassword}>{t('auth:resetPassword.requestNewLink')}</TextLink>
        </p>
      )}
    </CenteredCard>
  )
}
