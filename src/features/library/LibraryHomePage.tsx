import { Bookmark, Compass, CreditCard, Heart } from 'lucide-react'

import { FeatureCard } from '../../ui/FeatureCard'

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

export function LibraryHomePage() {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Tu biblioteca</h1>
        <p className="mt-2 text-stone-300">
          Estas secciones se están construyendo. Muy pronto podrás explorar y leer libros desde aquí.
        </p>
      </header>

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
