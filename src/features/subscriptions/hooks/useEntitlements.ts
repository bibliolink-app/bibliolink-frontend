import { useQuery } from '@tanstack/react-query'

import { membershipKeys } from '../lib/membershipKeys'
import { subscriptionsService } from '../services/subscriptionsService'

/** Estado de suscripción del usuario, separado de `auth` igual que decide session.ts para la sesión. */
export function useEntitlements() {
  const { data, isPending } = useQuery({
    queryKey: membershipKeys.membership,
    queryFn: subscriptionsService.membership,
    staleTime: 5 * 60_000,
    retry: false,
    retryOnMount: false,
  })

  const membership = data ?? 'FREE'

  return { membership, hasPremiumAccess: membership === 'PREMIUM', isPending }
}
