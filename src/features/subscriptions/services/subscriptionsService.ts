import { api } from '../../../api'
import type { ConfirmSubscriptionInput, Entitlement, ReserveSubscriptionResponse } from '../types'

export const subscriptionsService = {
  reserve: () => api.post<ReserveSubscriptionResponse>('/subscriptions').then((response) => response.data),

  confirm: (input: ConfirmSubscriptionInput) => api.post<void>('/subscriptions/confirm', input).then(() => undefined),

  // Pendiente en el backend: debe devolver `null` cuando el usuario nunca se suscribió.
  me: () => api.get<Entitlement | null>('/subscriptions/me').then((response) => response.data),
}
