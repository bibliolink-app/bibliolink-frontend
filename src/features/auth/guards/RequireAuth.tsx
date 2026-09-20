import { Navigate, Outlet, useLocation } from 'react-router'

import { PATHS } from '../../../router'
import { useSession } from '../hooks/useSession'

/** Protege un grupo de rutas: sin sesión redirige a /login recordando a dónde quería ir el usuario. */
export function RequireAuth() {
  const { user } = useSession()
  const location = useLocation()

  if (!user) {
    const from = location.pathname + location.search + location.hash
    return <Navigate to={PATHS.login} replace state={{ from }} />
  }

  return <Outlet />
}
