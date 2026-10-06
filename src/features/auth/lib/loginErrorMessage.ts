import { ApiError } from '../../../api'
import i18n from '@/i18n'

export function loginErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('auth:errors.login.generic')

  switch (error.status) {
    case 0:
      return i18n.t('auth:errors.common.connection')
    case 400:
      return error.messages.join(' ') || i18n.t('auth:errors.login.generic')
    case 401:
      return i18n.t('auth:errors.login.invalidCredentials')
    case 429:
      // El throttler del backend responde en inglés: se traduce aquí.
      return i18n.t('auth:errors.common.tooManyAttempts')
    default:
      return i18n.t('auth:errors.login.generic')
  }
}
