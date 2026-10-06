import i18n from '@/i18n'

import { ApiError } from '../../../api'

export function subscribeErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('subscriptions:errors.generic')

  switch (error.status) {
    case 0:
      return i18n.t('subscriptions:errors.network')
    case 403:
      return i18n.t('subscriptions:errors.inactiveAccount')
    case 409:
      // Una reserva PENDING abandonada (o una suscripción vigente) bloquea nuevos intentos.
      return i18n.t('subscriptions:errors.alreadySubscribed')
    default:
      return i18n.t('subscriptions:errors.generic')
  }
}
