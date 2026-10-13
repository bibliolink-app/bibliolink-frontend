import { ApiError } from '../../../api'
import i18n from '@/i18n'

// Mensajes de error de los dos pasos de recuperar la contraseña.

/**
 * El backend responde 200 con el mismo mensaje exista o no la cuenta, así que aquí solo llegan errores de red,
 * de validación o de límite de intentos: nunca "esa cuenta no existe".
 */
export function forgotPasswordErrorMessage(error: unknown): string {
  const generic = i18n.t('auth:errors.forgotPassword.generic')
  if (!(error instanceof ApiError)) return generic

  switch (error.status) {
    case 0:
      return i18n.t('auth:errors.common.connection')
    case 400:
      return error.messages.join(' ') || generic
    case 429:
      return i18n.t('auth:errors.common.tooManyAttemptsMinutes')
    default:
      return generic
  }
}

/** Un 400 trae el motivo en español: "El enlace de recuperación es inválido o ha expirado." o el de validación. */
export function resetPasswordErrorMessage(error: unknown): string {
  const generic = i18n.t('auth:errors.resetPassword.generic')
  if (!(error instanceof ApiError)) return generic

  switch (error.status) {
    case 0:
      return i18n.t('auth:errors.common.connection')
    case 400:
      return error.messages.join(' ') || generic
    case 429:
      return i18n.t('auth:errors.common.tooManyAttemptsMinutes')
    default:
      return generic
  }
}
