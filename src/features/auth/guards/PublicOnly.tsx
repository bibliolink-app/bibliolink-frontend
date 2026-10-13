import { Navigate, Outlet, useLocation } from 'react-router'

import { useSession } from '../hooks/useSession'
import { getSafeRedirect } from '../lib/safeRedirect'

/** Rutas solo para visitantes (login): con sesión activa redirige al destino original o al inicio. */
export function PublicOnly() {
  const { user } = useSession()
  const location = useLocation()

  if (user) return <Navigate to={getSafeRedirect(location.state)} replace />

  return <Outlet />
}
