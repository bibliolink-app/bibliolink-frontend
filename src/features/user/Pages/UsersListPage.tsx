import { useMemo } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, CircleAlert } from 'lucide-react'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { AdminsTable } from '../components/AdminTable'
import { useUsers } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'


export function NormalUsersListPage() {
  const { data: users, isPending, isError, error } = useUsers()


  const normales = useMemo(() => (users ?? []).filter((user) => user.role === 'USER'), [users])

  return (
    <>
      <Link
        to={PATHS.adminUsers}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver a administradores
      </Link>

      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">
          Usuarios normales
        </h1>
        <p className="mt-2 text-stone-300">
          Cuentas registradas por el público, tanto gratuitas como Premium.
        </p>
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

      {!isPending && !isError && normales.length === 0 && (
        <p className="rounded-lg bg-stone-300 px-4 py-6 text-center text-stone-600">
          No hay usuarios registrados.
        </p>
      )}

      {!isPending && !isError && normales.length > 0 && (
        <>
          <AdminsTable users={normales} />

        
        </>
      )}
    </>
  )
}
