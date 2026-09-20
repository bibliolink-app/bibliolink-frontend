import { revalidateLogic, useForm } from '@tanstack/react-form'
import { CircleAlert, LoaderCircle } from 'lucide-react'

import { PATHS } from '../../../router'
import { TextField } from '../../../ui/TextField'
import { TextLink } from '../../../ui/TextLink'
import { useLogin } from '../hooks/useLogin'
import { loginErrorMessage } from '../lib/loginErrorMessage'
import { loginSchema } from '../schemas/loginSchema'

export function LoginForm() {
  const login = useLogin()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    // Valida al enviar por primera vez y, a partir de ahí, en cada cambio.
    validationLogic: revalidateLogic(),
    validators: { onDynamic: loginSchema },
    // El error se muestra con `login.error`. El éxito no navega: al aparecer la sesión, `PublicOnly` redirige.
    onSubmit: ({ value }) => {
      login.mutate(loginSchema.parse(value))
    },
  })

  return (
    <form
      className="flex flex-col gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.Field name="email">
        {(field) => (
          <TextField
            label="Correo electrónico"
            name={field.name}
            type="email"
            autoComplete="email"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors.map((error) => error?.message)}
            disabled={login.isPending}
          />
        )}
      </form.Field>

      <div className="flex flex-col gap-2">
        <form.Field name="password">
          {(field) => (
            <TextField
              label="Contraseña"
              name={field.name}
              type="password"
              autoComplete="current-password"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={login.isPending}
            />
          )}
        </form.Field>

        <div className="text-right text-sm">
          <TextLink to={PATHS.forgotPassword}>¿Olvidaste tu contraseña?</TextLink>
        </div>
      </div>

      {login.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-sm font-medium text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{loginErrorMessage(login.error)}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={login.isPending}
        aria-busy={login.isPending}
        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-yellow-600 px-5 py-3 font-serif text-lg font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 enabled:cursor-pointer enabled:hover:bg-rose-900 enabled:hover:text-stone-300 enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-safe:transition-colors"
      >
        {login.isPending && <LoaderCircle className="size-5 motion-safe:animate-spin" />}
        {login.isPending ? 'Iniciando sesión…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
