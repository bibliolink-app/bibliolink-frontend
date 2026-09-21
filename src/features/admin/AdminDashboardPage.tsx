import { Link } from 'react-router'
import { BookOpen, CreditCard, Megaphone, UserCircle, Users } from 'lucide-react'

import { PATHS } from '../../router'
import { FeatureCard } from '../../ui/FeatureCard'

export function AdminDashboardPage() {
  // `SECTIONS` vive dentro del componente a propósito: `router.tsx` importa esta página y esta
  // página importa `PATHS` de vuelta. Leerlo en el nivel del módulo lo alcanzaría sin inicializar.
  const SECTIONS = [
    {
      title: 'Mi perfil',
      description: 'Consulta los datos de la cuenta con la que iniciaste sesión.',
      icon: <UserCircle className="size-6" />,
      to: PATHS.adminProfile,
    },
    {
      title: 'Usuarios',
      description: 'Consulta las cuentas, crea administradores y gestiona el estado de cada usuario.',
      icon: <Users className="size-6" />,
      to: PATHS.adminUsers,
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

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Panel de administración</h1>
        <p className="mt-2 text-stone-300">Desde aquí administras la plataforma.</p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2">
        {SECTIONS.map(({ to, ...section }) => (
          <li key={section.title}>
            {to ? (
              <Link
                to={to}
                className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                <FeatureCard {...section} pending={false} />
              </Link>
            ) : (
              <FeatureCard {...section} />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
