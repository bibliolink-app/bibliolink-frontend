import { PATHS } from '../../../router'
import { CenteredCard } from '../../../ui/CenteredCard'
import { TextLink } from '../../../ui/TextLink'
import { RegisterForm } from '../components/RegisterForm'

export function RegisterPage() {
  return (
    <CenteredCard title="Crea tu cuenta" description="Regístrate para empezar a leer en BiblioLink.">
      <RegisterForm />

      <p className="mt-7 border-t border-stone-500/30 pt-5 text-center text-sm text-stone-600">
        ¿Ya tienes cuenta? <TextLink to={PATHS.login}>Iniciar sesión</TextLink>
      </p>
    </CenteredCard>
  )
}
