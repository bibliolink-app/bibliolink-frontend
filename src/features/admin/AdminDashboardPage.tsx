import { BookOpen, CreditCard, Megaphone, Users } from 'lucide-react'

import { FeatureCard } from '../../ui/FeatureCard'

// Secciones previstas para el administrador. Ninguna está implementada todavía: se retira `pending` al construir cada una.
const SECTIONS = [
  {
    title: 'Usuarios',
    description: 'Consulta las cuentas, crea administradores y gestiona el estado de cada usuario.',
    icon: <Users className="size-6" />,
  },
  {
    title: 'Catálogo de libros',
    description: 'Administra libros, proveedores e idiomas de la colección.',
    icon: <BookOpen className="size-6" />,
  },
  {
    title: 'Suscripciones y pagos',
    description: 'Supervisa las suscripciones activas y las transacciones de pago.',
    icon: <CreditCard className="size-6" />,
  },
  {
    title: 'Publicidad',
    description: 'Configura los anuncios que ven los usuarios sin suscripción.',
    icon: <Megaphone className="size-6" />,
  },
]

export function AdminDashboardPage() {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Panel de administración</h1>
        <p className="mt-2 text-stone-300">
          Estas herramientas de gestión se están construyendo. Aquí administrarás la plataforma.
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
