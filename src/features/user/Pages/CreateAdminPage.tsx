import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

import { PATHS } from '../../../router'
import { CreateAdminForm } from '../components/CreateAdminForm'

export function CreateAdminPage() {
  return (
    <>
      <Link
        to={PATHS.adminUsers}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500"
      >
        <ArrowLeft className="size-4" />
        Volver a la lista
      </Link>

      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Nuevo administrador</h1>
        <p className="mt-2 text-stone-300">
          La cuenta se crea con rol de administrador y queda activa de inmediato.
        </p>
      </header>

      <div className="max-w-3xl rounded-lg bg-stone-300 p-6 shadow-xl ring-1 ring-black/25 sm:p-8">
        <CreateAdminForm />
      </div>
    </>
  )
}