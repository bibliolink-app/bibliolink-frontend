import { useMemo } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, CircleAlert, UserPlus } from 'lucide-react'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../ui/LoadingScreen'
import { AdminsTable } from '../components/AdminTable'
import { useUsers } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'

export function AdminsListPage() {
  const { data: users, isPending, isError, error } = useUsers()

  //  filtro por rol se hace aquí.
  const admins = useMemo(() => (users ?? []).filter((user) => user.role === 'ADMIN'), [users])

  return (
    <>
      <Link
        to={PATHS.admin}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500"
      >
        <ArrowLeft className="size-4" />
        Volver al panel
      </Link>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Administradores</h1>
          <p className="mt-2 text-stone-300">Cuentas con permisos de administración de la plataforma.</p>
        </div>

        <Link
          to={PATHS.adminUserNew}
          className="inline-flex items-center gap-2.5 rounded-md bg-yellow-600 px-5 py-3 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-rose-900 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 motion-safe:transition-colors"
        >
          <UserPlus className="size-5" />
          Nuevo administrador
        </Link>
      </header>

      {isPending && <LoadingScreen />}

      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{userErrorMessage(error)}</p>
        </div>
      )}

      {!isPending && !isError && admins.length === 0 && (
        <p className="rounded-lg bg-stone-300 px-4 py-6 text-center text-stone-600">
          No hay administradores registrados.
        </p>
      )}

      {!isPending && !isError && admins.length > 0 && <AdminsTable users={admins} />}
    </>
  )
}
