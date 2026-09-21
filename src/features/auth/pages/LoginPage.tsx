import { CircleCheck } from 'lucide-react'
import { useLocation } from 'react-router'

import { PATHS } from '../../../router'
import { CenteredCard } from '../../../ui/CenteredCard'
import { TextLink } from '../../../ui/TextLink'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const { state } = useLocation()

  // Al terminar de restablecer la contraseña se llega aquí con `state.passwordReset`.
  const passwordReset =
    typeof state === 'object' && state !== null && 'passwordReset' in state && state.passwordReset === true

  return (
    <CenteredCard title="Bienvenido de nuevo" description="Ingresa para continuar tu lectura.">
      {passwordReset && (
        <div
          role="status"
          className="mb-5 flex items-start gap-2.5 rounded-md border border-emerald-300 bg-emerald-50 px-3.5 py-3 text-sm font-medium text-emerald-900"
        >
          <CircleCheck className="mt-0.5 size-5 shrink-0" />
          <p>Contraseña actualizada. Ya puedes iniciar sesión.</p>
        </div>
      )}

      <LoginForm />

      <p className="mt-7 border-t border-stone-500/30 pt-5 text-center text-sm text-stone-600">
        ¿Aún no tienes cuenta?{' '}
        <TextLink to={PATHS.register}>Crear cuenta</TextLink>
      </p>
    </CenteredCard>
  )
}
