import { Bookmark, CircleAlert, Compass, CreditCard, Heart, LoaderCircle } from 'lucide-react'

import { FeatureCard } from '../../ui/FeatureCard'
import { useProfile } from '../user/Hook/UserHook'

// Secciones previstas para el usuario. Ninguna está implementada todavía: se retira `pending` al construir cada una.
const SECTIONS = [
  {
    title: 'Catálogo',
    description: 'Explora la colección de libros EPUB disponibles para leer directamente en el navegador.',
    icon: <Compass className="size-6" />,
  },
  {
    title: 'Continuar leyendo',
    description: 'Retoma tu lectura justo en el punto donde la dejaste.',
    icon: <Bookmark className="size-6" />,
  },
  {
    title: 'Favoritos',
    description: 'Guarda los libros que quieres tener siempre a mano.',
    icon: <Heart className="size-6" />,
  },
  {
    title: 'Mi suscripción',
    description: 'Consulta tu plan y administra tu acceso a la biblioteca.',
    icon: <CreditCard className="size-6" />,
  },
]

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold tracking-wide text-stone-600">{label}</dt>
      <dd className="mt-0.5 text-stone-900">{value}</dd>
    </div>
  )
}

/** Ficha con los datos de la cuenta. Ocupa el lugar del catálogo mientras no exista la API de libros. */
function ProfileCard() {
  const { data: profile, isPending, isError } = useProfile()

  if (isPending) {
    return (
      <article className="grid place-items-center rounded-lg bg-stone-300 p-6 shadow-xl ring-1 ring-black/25">
        <LoaderCircle className="size-6 text-stone-600 motion-safe:animate-spin" />
      </article>
    )
  }

  if (isError) {
    return (
      <article
        role="alert"
        className="flex items-start gap-2.5 rounded-lg border border-rose-300 bg-rose-100 px-4 py-3 text-rose-900"
      >
        <CircleAlert className="mt-0.5 size-5 shrink-0" />
        <p>No se pudieron cargar los datos de tu cuenta.</p>
      </article>
    )
  }

  const fullName = [profile.firstName, profile.middleName, profile.firstSurname, profile.secondSurname]
    .filter(Boolean)
    .join(' ')

  return (
    <article className="rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-8">
      <h2 className="font-serif text-2xl font-semibold">{fullName}</h2>
      <p className="mt-1 text-stone-600">@{profile.username}</p>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Correo electrónico" value={profile.email} />
        <Field label="Fecha de nacimiento" value={profile.birthDate} />
      </dl>
    </article>
  )
}

export function LibraryHomePage() {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Tu biblioteca</h1>
        <p className="mt-2 text-stone-300">
          Estos son tus datos. El catálogo y la lectura se están construyendo.
        </p>
      </header>

      <div className="mb-10">
        <ProfileCard />
      </div>

      <h2 className="mb-5 font-serif text-2xl font-semibold text-stone-300">Próximamente</h2>

      <ul className="grid gap-5 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <li key={section.title}>
            <FeatureCard {...section} />
          </li>
        ))}
      </ul>
    </>
  )
}
