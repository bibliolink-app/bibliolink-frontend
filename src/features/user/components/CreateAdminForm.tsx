import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import { CircleAlert, LoaderCircle } from 'lucide-react'

import { PATHS } from '../../../router'
import { TextField } from '../../../ui/TextField'
import { useCreateAdmin } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'
import { crearAdminSchema } from '../Schemas/UserSchemas'

export function CreateAdminForm() {
  const createAdmin = useCreateAdmin()
  const navigate = useNavigate()

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
    },
    // Valida al enviar por primera vez y, a partir de ahí, en cada cambio.
    validationLogic: revalidateLogic(),
    validators: { onDynamic: crearAdminSchema },
    onSubmit: async ({ value }) => {
      // `parse` aplica los trim y convierte los campos vacíos opcionales en null.
      await createAdmin.mutateAsync(crearAdminSchema.parse(value))
      await navigate(PATHS.adminUsers)
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
      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="username">
          {(field) => (
            <TextField
              label="Nombre de usuario"
              name={field.name}
              autoComplete="off"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={createAdmin.isPending}
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <TextField
              label="Correo electrónico"
              name={field.name}
              type="email"
              autoComplete="off"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={createAdmin.isPending}
            />
          )}
        </form.Field>

        <form.Field name="firstName">
          {(field) => (
            <TextField
              label="Primer nombre"
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={createAdmin.isPending}
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
              disabled={createAdmin.isPending}
            />
          )}
        </form.Field>

        <form.Field name="firstSurname">
          {(field) => (
            <TextField
              label="Primer apellido"
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={createAdmin.isPending}
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
              disabled={createAdmin.isPending}
            />
          )}
        </form.Field>

        <form.Field name="birthDate">
          {(field) => (
            <TextField
              label="Fecha de nacimiento"
              name={field.name}
              type="date"
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors.map((error) => error?.message)}
              disabled={createAdmin.isPending}
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
              disabled={createAdmin.isPending}
            />
          )}
        </form.Field>
      </div>

      {createAdmin.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-sm font-medium text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{userErrorMessage(createAdmin.error)}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={createAdmin.isPending}
        aria-busy={createAdmin.isPending}
        className="inline-flex items-center justify-center gap-2.5 self-start rounded-md bg-yellow-600 px-5 py-3 font-serif text-lg font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 enabled:cursor-pointer enabled:hover:bg-rose-900 enabled:hover:text-stone-300 enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-safe:transition-colors"
      >
        {createAdmin.isPending && <LoaderCircle className="size-5 motion-safe:animate-spin" />}
        {createAdmin.isPending ? 'Creando…' : 'Crear administrador'}
      </button>
    </form>
  )
}