import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, CircleAlert } from 'lucide-react'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../ui/LoadingScreen'
import { useSession } from '../../auth/hooks/useSession'
import { ROLE_LABELS } from '../../auth/types'
import { useProfile } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'

/** Un dato del perfil, en su propia tarjeta: la etiqueta arriba y el valor debajo. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-stone-100 p-4 ring-1 ring-stone-500/15">
      <dt className="text-xs font-semibold tracking-wide text-stone-600 uppercase">{label}</dt>
      {/* `break-words` evita que un correo largo se salga de la tarjeta. */}
      <dd className="mt-1 break-words text-stone-900">{value}</dd>
    </div>
  )
}

/** Grupo de datos con su encabezado y una línea que lo separa del anterior. */
function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-serif text-lg font-semibold text-stone-900">{title}</h3>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  )
}

/** Devuelve las iniciales de las dos primeras palabras del nombre. */
function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')
    .toUpperCase()
}

export function AdminProfilePage() {
  // El perfil trae los datos personales; el rol y el estado vienen de la sesión.
  const { data: profile, isPending, isError, error } = useProfile()
  const { user } = useSession()

  if (isPending) return <LoadingScreen />

  if (isError) {
    return (
      <div
        role="alert"
        className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-rose-900"
      >
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
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver al panel
      </Link>

    

      <article className="max-w-4xl rounded-lg bg-stone-300 shadow-xl ring-1 ring-black/25">
        {/* Cabecera de la ficha: avatar con iniciales, nombre y rol. */}
        <div className="flex flex-wrap items-center gap-5 border-b border-stone-500/25 p-6 sm:p-8">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-full bg-yellow-600 font-serif text-2xl font-bold text-stone-900 ring-4 ring-yellow-600/25"
          >
            {getInitials(fullName)}
          </span>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">{fullName}</h2>
            {user && (
              <span className="mt-1.5 inline-block rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600 ring-1 ring-stone-500/40">
                {ROLE_LABELS[user.role]}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-10 p-6 sm:p-8">
          <FieldGroup title="Información de cuenta">
            <Field label="Nombre de usuario" value={profile.username} />
            <Field label="Correo electrónico" value={profile.email} />
          </FieldGroup>

          <FieldGroup title="Información personal">
            <Field label="Primer nombre" value={profile.firstName} />
            <Field label="Segundo nombre" value={profile.middleName ?? '—'} />
            <Field label="Primer apellido" value={profile.firstSurname} />
            <Field label="Segundo apellido" value={profile.secondSurname ?? '—'} />
            <Field label="Fecha de nacimiento" value={profile.birthDate} />
          </FieldGroup>
        </div>
      </article>
    </>
  )
}
