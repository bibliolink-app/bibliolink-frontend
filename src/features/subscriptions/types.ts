export interface ReserveSubscriptionResponse {
  subscriptionId: number
  checkoutReference: string
}

export interface ConfirmSubscriptionInput {
  subscriptionId: number
  externalSubscriptionReference: string
}

/** Espejo del enum `Membership` del backend (`GET /subscriptions/membership`). */
export type Membership = 'FREE' | 'PREMIUM'
