import { Navigate, Outlet, useLocation } from 'react-router'

import { PageLoader } from '../../../components/ui/PageLoader'
import { PATHS } from '../../../router'
import { useSession } from '../hooks/useSession'

/** Protege un grupo de rutas: sin sesión redirige a / recordando a dónde quería ir el usuario. */
export function RequireAuth() {
  const { user, isPending } = useSession()
  const location = useLocation()

  // Solo las rutas protegidas esperan al backend; las públicas se pintan sin esperar.
  if (isPending) return <PageLoader />

  if (!user) {
    const from = location.pathname + location.search + location.hash
    return <Navigate to={PATHS.landing} replace state={{ from }} />
  }

  return <Outlet />
}
