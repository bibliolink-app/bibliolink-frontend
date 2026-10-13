import { api } from '../../../api'
import type { ConfirmSubscriptionInput, Membership, ReserveSubscriptionResponse } from '../types'

export const subscriptionsService = {
  reserve: () => api.post<ReserveSubscriptionResponse>('/subscriptions').then((response) => response.data),

  confirm: (input: ConfirmSubscriptionInput) => api.post<void>('/subscriptions/confirm', input).then(() => undefined),

  membership: () =>
    api.get<{ membership: Membership }>('/subscriptions/membership').then((response) => response.data.membership),
}
