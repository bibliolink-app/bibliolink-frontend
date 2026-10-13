import { Outlet } from 'react-router'

import { useSession } from '../hooks/useSession'
import { ForbiddenPage } from '../pages/ForbiddenPage'
import type { UserRole } from '../types'

/**
 * Restringe un grupo de rutas a ciertos roles. Es solo experiencia de usuario: el backend sigue siendo quien
 * decide (responde 403 a un usuario sin permiso aunque alguien llegue a esta pantalla).
 */
export function RequireRole({ roles }: { roles: readonly UserRole[] }) {
  const { user } = useSession()

  if (!user || !roles.includes(user.role)) return <ForbiddenPage />

  return <Outlet />
}
