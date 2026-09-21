import { revalidateLogic, useForm } from '@tanstack/react-form'
import { CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router'

import { ApiError } from '../../../api'
import { PATHS } from '../../../router'
import { Button } from '../../../ui/Button'
import { TextField } from '../../../ui/TextField'
import { TextLink } from '../../../ui/TextLink'
import { useResetPassword } from '../hooks/usePasswordRecovery'
import { resetPasswordErrorMessage } from '../lib/passwordRecoveryErrorMessage'
import { resetPasswordSchema } from '../schemas/passwordRecoverySchema'

export function ResetPasswordForm({ token }: { token: string }) {
  const reset = useResetPassword()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' },
    // Valida al enviar por primera vez y, a partir de ahí, en cada cambio.
    validationLogic: revalidateLogic(),
    validators: { onDynamic: resetPasswordSchema },
    onSubmit: ({ value }) => {
      // `confirmPassword` solo existe en el cliente: al backend van únicamente el token y la nueva contraseña.
      const { newPassword } = resetPasswordSchema.parse(value)

      reset.mutate(
        { token, newPassword },
        // Restablecer no inicia sesión: se lleva al login con un aviso.
        { onSuccess: () => navigate(PATHS.login, { replace: true, state: { passwordReset: true } }) },
      )
    },
  })

  // Un 400 significa enlace inválido, caducado o ya usado: la salida es pedir otro.
  const linkRejected = reset.error instanceof ApiError && reset.error.status === 400

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
      <div className="flex flex-col gap-2">
        <form.Field name="newPassword">
          {(field) => (
            <TextField
              label="Nueva contraseña"
              name={field.name}
              type="password"
              autoComplete="new-password"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={reset.isPending}
            />
          )}
        </form.Field>
        <p className="text-sm text-stone-600">Mínimo 8 caracteres, con una letra, un número y un símbolo.</p>
      </div>

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
            disabled={reset.isPending}
          />
        )}
      </form.Field>

      {reset.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-sm font-medium text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col gap-1.5">
            <p>{resetPasswordErrorMessage(reset.error)}</p>
            {linkRejected && <TextLink to={PATHS.forgotPassword}>Solicitar un enlace nuevo</TextLink>}
          </div>
        </div>
      )}

      <Button type="submit" loading={reset.isPending}>
        {reset.isPending ? 'Guardando…' : 'Restablecer contraseña'}
      </Button>
    </form>
  )
}
