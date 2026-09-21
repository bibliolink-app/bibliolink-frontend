import { CenteredCard } from '../../../ui/CenteredCard'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

export function ForgotPasswordPage() {
  return (
    <CenteredCard
      title="Recuperar contraseña"
      description="Ingresa el correo de tu cuenta y te enviaremos las instrucciones para restablecerla."
    >
      <ForgotPasswordForm />
    </CenteredCard>
  )
}
