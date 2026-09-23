import { Link } from 'react-router'
import { ArrowLeft, CircleAlert } from 'lucide-react'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../ui/LoadingScreen'
import { useSession } from '../../auth/hooks/useSession'
import { ROLE_LABELS } from '../../auth/types'
import { useProfile } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'

/** Muestra una etiqueta y su valor dentro de la ficha. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold tracking-wide text-stone-600">{label}</dt>
      <dd className="mt-0.5 text-stone-900">{value}</dd>
    </div>
  )
}

export function AdminProfilePage() {
  // El perfil trae los datos personales; el rol y el estado vienen de la sesión.
  const { data: profile, isPending, isError, error } = useProfile()
  const { user } = useSession()

  if (isPending) return <LoadingScreen />

  if (isError) {
    return (
      <div role="alert" className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-rose-900">
        <CircleAlert className="mt-0.5 size-5 shrink-0" />
        <p>{userErrorMessage(error)}</p>
      </div>
    )
  }

  const fullName = [profile.firstName, profile.middleName, profile.firstSurname, profile.secondSurname]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <Link
        to={PATHS.admin}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500"
      >
        <ArrowLeft className="size-4" />
        Volver al panel
      </Link>

      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Mi perfil</h1>
        <p className="mt-2 text-stone-300">Datos de la cuenta con la que iniciaste sesión.</p>
      </header>

      <article className="rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl font-semibold">{fullName}</h2>
          {user && (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600 ring-1 ring-stone-500/40">
              {ROLE_LABELS[user.role]}
            </span>
          )}
        </div>

        <dl className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre de usuario" value={profile.username} />
          <Field label="Correo electrónico" value={profile.email} />
          <Field label="Primer nombre" value={profile.firstName} />
          <Field label="Segundo nombre" value={profile.middleName ?? '—'} />
          <Field label="Primer apellido" value={profile.firstSurname} />
          <Field label="Segundo apellido" value={profile.secondSurname ?? '—'} />
          <Field label="Fecha de nacimiento" value={profile.birthDate} />
        </dl>
      </article>
    </>
  )
}