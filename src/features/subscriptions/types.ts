export interface ReserveSubscriptionResponse {
  subscriptionId: number
  checkoutReference: string
}

export interface ConfirmSubscriptionInput {
  subscriptionId: number
  externalSubscriptionReference: string
}

/** Espejo del enum `SubscriptionStatus` del backend. */
export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'EXPIRED'

/** `NONE`: el usuario nunca se suscribió (el backend no tiene fila para él en `GET /subscriptions/me`). */
export type EntitlementStatus = SubscriptionStatus | 'NONE'

export interface Entitlement {
  status: EntitlementStatus
  currentPeriodEnd: string | null
}

export const NO_SUBSCRIPTION: Entitlement = {
  status: 'NONE',
  currentPeriodEnd: null,
}
