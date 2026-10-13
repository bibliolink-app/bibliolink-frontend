import { useMutation } from '@tanstack/react-query'

import { subscriptionsService } from '../services/subscriptionsService'
import type { ConfirmSubscriptionInput } from '../types'

export function useReserveSubscription() {
  return useMutation({
    mutationFn: subscriptionsService.reserve,
  })
}

export function useConfirmSubscription() {
  return useMutation({
    // El pago queda registrado, pero solo el webhook de PayPal activa la suscripción (ver useSubscriptionEvents).
    mutationFn: (input: ConfirmSubscriptionInput) => subscriptionsService.confirm(input),
  })
}
