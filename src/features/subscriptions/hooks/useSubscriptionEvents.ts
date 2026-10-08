import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { API_URL } from '../../../api'
import { membershipKeys } from '../lib/membershipKeys'

/**
 * Escucha en tiempo real los cambios de suscripción (SSE) e invalida `useEntitlements` para que
 * vuelva a pedir `GET /subscriptions/membership`, sin esperar a que la query se revalide sola. En
 * local, sin webhook de PayPal alcanzable, estos eventos nunca llegan y el estado se queda como lo
 * haya devuelto la última consulta a `membership`.
 */
export function useSubscriptionEvents(enabled: boolean): void {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!enabled) return

    const source = new EventSource(`${API_URL}/subscriptions/events`, { withCredentials: true })

    const refetchMembership = () => {
      void queryClient.invalidateQueries({ queryKey: membershipKeys.membership })
    }

    source.addEventListener('subscription.activated', refetchMembership)
    source.addEventListener('subscription.canceled', refetchMembership)

    return () => {
      source.removeEventListener('subscription.activated', refetchMembership)
      source.removeEventListener('subscription.canceled', refetchMembership)
      source.close()
    }
  }, [enabled, queryClient])
}
