import { useQuery } from '@tanstack/react-query'

import { entitlementKeys } from '../lib/entitlementKeys'
import { subscriptionsService } from '../services/subscriptionsService'
import { NO_SUBSCRIPTION } from '../types'

async function fetchEntitlement() {
  const entitlement = await subscriptionsService.me()
  return entitlement ?? NO_SUBSCRIPTION
}

/** Estado de suscripción del usuario, separado de `auth` igual que decide session.ts para la sesión. */
export function useEntitlements() {
  const { data, isPending } = useQuery({
    queryKey: entitlementKeys.entitlement,
    queryFn: fetchEntitlement,
    staleTime: 5 * 60_000,
    retry: false,
    retryOnMount: false,
  })

  const entitlement = data ?? NO_SUBSCRIPTION

  // Hay dos orígenes: `GET /subscriptions/membership`, donde el backend ya
  // resolvió la vigencia y deja `currentPeriodEnd` en `null`; y los eventos
  // SSE, que sí traen la fecha. Cuando hay fecha, manda la fecha.
  const hasPremiumAccess =
    (entitlement.status === 'ACTIVE' || entitlement.status === 'CANCELED') &&
    (entitlement.currentPeriodEnd === null ||
      new Date(entitlement.currentPeriodEnd) > new Date())

  return { entitlement, hasPremiumAccess, isPending }
}
