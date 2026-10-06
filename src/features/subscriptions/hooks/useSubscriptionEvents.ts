import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { API_URL } from '../../../api'
import { entitlementKeys } from '../lib/entitlementKeys'
import type { Entitlement } from '../types'

interface SubscriptionStreamPayload {
  subscriptionId: number
  currentPeriodEnd: string
}

/**
 * Escucha en tiempo real los cambios de suscripción (SSE) y actualiza `useEntitlements` sin
 * esperar a que la query se revalide sola. En local, sin webhook de PayPal alcanzable, estos
 * eventos nunca llegan y el estado se queda como lo haya devuelto `GET /subscriptions/me`.
 */
export function useSubscriptionEvents(enabled: boolean): void {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!enabled) return

    const source = new EventSource(`${API_URL}/subscriptions/events`, { withCredentials: true })

    const setEntitlement = (entitlement: Entitlement) => {
      queryClient.setQueryData(entitlementKeys.entitlement, entitlement)
    }

    const onActivated = (event: MessageEvent<string>) => {
      const payload = JSON.parse(event.data) as SubscriptionStreamPayload
      setEntitlement({ status: 'ACTIVE', currentPeriodEnd: payload.currentPeriodEnd })
    }

    const onCanceled = (event: MessageEvent<string>) => {
      const payload = JSON.parse(event.data) as SubscriptionStreamPayload
      setEntitlement({ status: 'CANCELED', currentPeriodEnd: payload.currentPeriodEnd })
    }

    source.addEventListener('subscription.activated', onActivated)
    source.addEventListener('subscription.canceled', onCanceled)

    return () => {
      source.removeEventListener('subscription.activated', onActivated)
      source.removeEventListener('subscription.canceled', onCanceled)
      source.close()
    }
  }, [enabled, queryClient])
}
