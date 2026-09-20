import { PATHS } from '../../../router'
import { CenteredCard } from '../../../ui/CenteredCard'
import { TextLink } from '../../../ui/TextLink'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <CenteredCard title="Bienvenido de nuevo" description="Ingresa para continuar tu lectura.">
      <LoginForm />

      <p className="mt-7 border-t border-stone-500/30 pt-5 text-center text-sm text-stone-600">
        ¿Aún no tienes cuenta?{' '}
        <TextLink to={PATHS.register}>Crear cuenta</TextLink>
      </p>
    </CenteredCard>
  )
}
