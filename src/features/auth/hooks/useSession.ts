import { useQuery } from '@tanstack/react-query'

import { ApiError } from '../../../api'
import { authKeys } from '../lib/session'
import { authService } from '../services/authService'
import type { AuthUser } from '../types'

async function fetchSession(): Promise<AuthUser | null> {
  try {
    return await authService.me()
  } catch (error) {
    // Sin sesión es un estado normal (visitante anónimo), no un error.
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}

export function useSession() {
  const { data, isPending } = useQuery({
    queryKey: authKeys.session,
    queryFn: fetchSession,
    // El backend revalida la cuenta en cada request, así que un dato "viejo" no es un riesgo de seguridad.
    staleTime: 5 * 60_000,
    retry: false,
    // Si la sesión no pudo consultarse (backend caído, 5xx), no reintentar cada vez que un guard se monte:
    // la query volvería a `pending`, `SessionGate` desmontaría el árbol y se entraría en un bucle de peticiones.
    retryOnMount: false,
  })

  const user = data ?? null

  return { user, isPending, isAdmin: user?.role === 'ADMIN' }
}
