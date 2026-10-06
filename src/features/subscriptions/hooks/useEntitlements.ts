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

  // Espejo de `hasPremiumAccess` del backend: el `status` puede quedar desactualizado
  // (no hay ningún proceso que lo pase a EXPIRED), así que la fecha manda siempre.
  const hasPremiumAccess =
    (entitlement.status === 'ACTIVE' || entitlement.status === 'CANCELED') &&
    entitlement.currentPeriodEnd !== null &&
    new Date(entitlement.currentPeriodEnd) > new Date()

  return { entitlement, hasPremiumAccess, isPending }
}
