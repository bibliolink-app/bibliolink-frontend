import { Navigate, Outlet } from 'react-router'

import { useSession } from '../hooks/useSession'

/** Los administradores no usan esta ruta: se les lleva a `to`. El resto de usuarios ve la ruta hija. */
export function RedirectAdmins({ to }: { to: string }) {
  const { isAdmin } = useSession()

  return isAdmin ? <Navigate to={to} replace /> : <Outlet />
}
