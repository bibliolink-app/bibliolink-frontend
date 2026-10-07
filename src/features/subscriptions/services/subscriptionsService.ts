import { api } from '../../../api'
import type { ConfirmSubscriptionInput, Entitlement, ReserveSubscriptionResponse } from '../types'

export const subscriptionsService = {
  reserve: () => api.post<ReserveSubscriptionResponse>('/subscriptions').then((response) => response.data),

  confirm: (input: ConfirmSubscriptionInput) => api.post<void>('/subscriptions/confirm', input).then(() => undefined),

  // El backend ya resuelve si la suscripción está vigente y responde
  // `FREE` o `PREMIUM`. Aquí se traduce al modelo local, que además maneja
  // los estados intermedios que llegan por SSE (`PENDING`, `CANCELED`).
  // `currentPeriodEnd: null` significa "el backend ya confirmó el acceso".
  me: async (): Promise<Entitlement | null> => {
    const { data } = await api.get<{ membership: 'FREE' | 'PREMIUM' }>(
      '/subscriptions/membership',
    )

    return data.membership === 'PREMIUM'
      ? { status: 'ACTIVE', currentPeriodEnd: null }
      : null
  },
}
