import { useSearchParams } from 'react-router'

import { PATHS } from '../../../router'
import { CenteredCard } from '../../../ui/CenteredCard'
import { TextLink } from '../../../ui/TextLink'
import { ResetPasswordForm } from '../components/ResetPasswordForm'

// El backend genera el token con 32 bytes en hexadecimal: 64 caracteres. Si no tiene esa forma, ni se intenta.
const TOKEN_FORMAT = /^[0-9a-f]{64}$/i

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const hasValidToken = TOKEN_FORMAT.test(token)

  return (
    <CenteredCard
      title={hasValidToken ? 'Nueva contraseña' : 'Enlace no válido'}
      description={
        hasValidToken
          ? 'Elige una contraseña segura para tu cuenta.'
          : 'Este enlace de recuperación no es válido o está incompleto.'
      }
    >
      {/* El token viaja en la URL: que no se filtre a otros sitios por la cabecera Referer. React 19 lo sube al <head>. */}
      <meta name="referrer" content="no-referrer" />

      {hasValidToken ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="text-center">
          <TextLink to={PATHS.forgotPassword}>Solicitar un enlace nuevo</TextLink>
        </p>
      )}
    </CenteredCard>
  )
}
