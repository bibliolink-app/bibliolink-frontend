import { useCallback, useState } from 'react'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { CircleAlert, LoaderCircle } from 'lucide-react'

import { TextField } from '../../../ui/TextField'
import { useRegister } from '../hooks/useRegister'
import { registerErrorMessage } from '../lib/registerErrorMessage'
import { registerFormSchema, registerSchema } from '../schemas/registerSchema'
import { TurnstileWidget } from './TurnstileWidget'

export function RegisterForm() {
  const register = useRegister()
  // Los tokens de Turnstile son de un solo uso: tras un error hay que pedir uno nuevo.
  const [captchaAttempt, setCaptchaAttempt] = useState(0)

  const form = useForm({
    defaultValues: {
      username: '',
      firstName: '',
      middleName: '',
      firstSurname: '',
      secondSurname: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: '',
      captchaToken: '',
    },
    // Valida al enviar por primera vez y, a partir de ahí, en cada cambio.
    validationLogic: revalidateLogic(),
    validators: { onDynamic: registerFormSchema },
    // El éxito no navega: al aparecer la sesión, `PublicOnly` redirige al panel.
    onSubmit: ({ value }) => {
      // `registerSchema` descarta `confirmPassword`, que el backend no acepta.
      register.mutate(registerSchema.parse(value), {
        onError: () => {
          // El token ya se consumió en el intento fallido: se descarta y se pide otro.
          form.setFieldValue('captchaToken', '')
          setCaptchaAttempt((attempt) => attempt + 1)
        },
      })
    },
  })

  const handleToken = useCallback((token: string) => form.setFieldValue('captchaToken', token), [form])

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
      <form.Field name="username">
        {(field) => (
          <TextField
            label="Nombre de usuario"
            name={field.name}
            autoComplete="username"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors.map((error) => error?.message)}
            disabled={register.isPending}
          />
        )}
      </form.Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="firstName">
          {(field) => (
            <TextField
              label="Primer nombre"
              name={field.name}
              autoComplete="given-name"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={register.isPending}
            />
          )}
        </form.Field>

        <form.Field name="middleName">
          {(field) => (
            <TextField
              label="Segundo nombre (opcional)"
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={register.isPending}
            />
          )}
        </form.Field>

        <form.Field name="firstSurname">
          {(field) => (
            <TextField
              label="Primer apellido"
              name={field.name}
              autoComplete="family-name"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={register.isPending}
            />
          )}
        </form.Field>

        <form.Field name="secondSurname">
          {(field) => (
            <TextField
              label="Segundo apellido (opcional)"
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={register.isPending}
            />
          )}
        </form.Field>
      </div>

      <form.Field name="birthDate">
        {(field) => (
          <TextField
            label="Fecha de nacimiento"
            name={field.name}
            type="date"
            autoComplete="bday"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors.map((error) => error?.message)}
            disabled={register.isPending}
          />
        )}
      </form.Field>

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
            disabled={register.isPending}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <TextField
            label="Contraseña"
            name={field.name}
            type="password"
            autoComplete="new-password"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors.map((error) => error?.message)}
            disabled={register.isPending}
          />
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <TextField
            label="Confirmar contraseña"
            name={field.name}
            type="password"
            autoComplete="new-password"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors.map((error) => error?.message)}
            disabled={register.isPending}
          />
        )}
      </form.Field>

      <form.Field name="captchaToken">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <TurnstileWidget onToken={handleToken} resetKey={captchaAttempt} />
            {field.state.meta.errors.length > 0 && (
              <p className="flex items-start gap-1.5 text-sm font-medium text-rose-900">
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                <span>{field.state.meta.errors[0]?.message}</span>
              </p>
            )}
          </div>
        )}
      </form.Field>

      {register.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-sm font-medium text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{registerErrorMessage(register.error)}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={register.isPending}
        aria-busy={register.isPending}
        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-yellow-600 px-5 py-3 font-serif text-lg font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 enabled:cursor-pointer enabled:hover:bg-yellow-800 enabled:hover:text-stone-300 enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-safe:transition-colors"
      >
        {register.isPending && <LoaderCircle className="size-5 motion-safe:animate-spin" />}
        {register.isPending ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
    </form>
  )
}
