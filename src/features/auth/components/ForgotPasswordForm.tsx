import { revalidateLogic, useForm } from '@tanstack/react-form'
import { CircleAlert, MailCheck } from 'lucide-react'

import { PATHS } from '../../../router'
import { Button } from '../../../ui/Button'
import { TextField } from '../../../ui/TextField'
import { TextLink } from '../../../ui/TextLink'
import { useForgotPassword } from '../hooks/usePasswordRecovery'
import { forgotPasswordErrorMessage } from '../lib/passwordRecoveryErrorMessage'
import { forgotPasswordSchema } from '../schemas/passwordRecoverySchema'

export function ForgotPasswordForm() {
  const forgot = useForgotPassword()

  const form = useForm({
    defaultValues: { email: '' },
    // Valida al enviar por primera vez y, a partir de ahí, en cada cambio.
    validationLogic: revalidateLogic(),
    validators: { onDynamic: forgotPasswordSchema },
    onSubmit: ({ value }) => {
      forgot.mutate(forgotPasswordSchema.parse(value))
    },
  })

  // El backend responde igual exista o no la cuenta: la confirmación tampoco debe distinguirlo.
  if (forgot.isSuccess) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 text-center">
        <MailCheck className="size-10 text-yellow-800" />
        <p className="text-stone-900">
          Si existe una cuenta asociada a ese correo, te enviaremos las instrucciones para restablecer tu contraseña.
        </p>
        <p className="text-sm text-stone-600">
          Revisa también la carpeta de spam. El enlace tiene una duración limitada.
        </p>
        <TextLink to={PATHS.login}>Volver a iniciar sesión</TextLink>
      </div>
    )
  }

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
            disabled={forgot.isPending}
          />
        )}
      </form.Field>

      {forgot.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-sm font-medium text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{forgotPasswordErrorMessage(forgot.error)}</p>
        </div>
      )}

      <Button type="submit" loading={forgot.isPending}>
        {forgot.isPending ? 'Enviando…' : 'Enviar instrucciones'}
      </Button>

      <p className="text-center text-sm">
        <TextLink to={PATHS.login}>Volver a iniciar sesión</TextLink>
      </p>
    </form>
  )
}
