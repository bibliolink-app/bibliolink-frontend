import { ApiError } from '../../../api'
import i18n from '@/i18n'

export function registerErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('auth:errors.register.generic')

  switch (error.status) {
    case 0:
      return i18n.t('auth:errors.common.connection')
    case 400:
      // Aquí cae también el CAPTCHA rechazado por el backend.
      return error.messages.join(' ') || i18n.t('auth:errors.register.generic')
    case 409:
      // El correo o el nombre de usuario ya están registrados.
      return error.messages[0] ?? i18n.t('auth:errors.register.alreadyRegistered')
    case 429:
      // El throttler del backend responde en inglés: se traduce aquí.
      return i18n.t('auth:errors.common.tooManyAttemptsMinutes')
    case 503:
      // El backend no pudo contactar con Cloudflare para verificar el CAPTCHA.
      return i18n.t('auth:errors.register.captchaUnavailable')
    default:
      return i18n.t('auth:errors.register.generic')
  }
}
