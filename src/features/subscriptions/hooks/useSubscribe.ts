import { useMutation, useQueryClient } from '@tanstack/react-query'

import { entitlementKeys } from '../lib/entitlementKeys'
import { subscriptionsService } from '../services/subscriptionsService'
import type { ConfirmSubscriptionInput } from '../types'

export function useReserveSubscription() {
  return useMutation({
    mutationFn: subscriptionsService.reserve,
  })
}

export function useConfirmSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ConfirmSubscriptionInput) => subscriptionsService.confirm(input),
    // El pago queda registrado, pero solo el webhook de PayPal activa la suscripción (ver useSubscriptionEvents).
    onSuccess: () => {
      queryClient.setQueryData(entitlementKeys.entitlement, {
        status: 'PENDING',
        currentPeriodEnd: null,
      })
    },
  })
}
