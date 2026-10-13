import { revalidateLogic, useForm } from '@tanstack/react-form'
import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { FormButton } from '../../../components/ui/FormButton'
import { TextField } from '../../../components/ui/TextField'
import { TextLink } from '../../../components/ui/TextLink'
import { useLogin } from '../hooks/useLogin'
import { loginErrorMessage } from '../lib/loginErrorMessage'
import { loginSchema } from '../schemas/loginSchema'

export function LoginForm() {
  const { t } = useTranslation()
  const login = useLogin()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    // Valida en cada cambio desde el inicio, no solo tras el primer intento de envío.
    validationLogic: revalidateLogic({ mode: 'change' }),
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
            label={t('auth:login.emailLabel')}
            name={field.name}
            type="email"
            autoComplete="email"
            maxLength={254}
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
              label={t('auth:login.passwordLabel')}
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
          <TextLink to={PATHS.forgotPassword}>{t('auth:login.forgotPassword')}</TextLink>
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

      <FormButton type="submit" loading={login.isPending}>
        {login.isPending ? t('auth:login.submitting') : t('auth:login.submit')}
      </FormButton>
    </form>
  )
}
