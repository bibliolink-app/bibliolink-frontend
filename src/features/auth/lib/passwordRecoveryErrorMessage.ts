import { ApiError } from '../../../api'

// Mensajes de error de los dos pasos de recuperar la contraseña.

const CONNECTION = 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
// El throttler del backend responde en inglés: se traduce aquí.
const TOO_MANY_ATTEMPTS = 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'

/**
 * El backend responde 200 con el mismo mensaje exista o no la cuenta, así que aquí solo llegan errores de red,
 * de validación o de límite de intentos: nunca "esa cuenta no existe".
 */
export function forgotPasswordErrorMessage(error: unknown): string {
  const generic = 'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.'
  if (!(error instanceof ApiError)) return generic

  switch (error.status) {
    case 0:
      return CONNECTION
    case 400:
      return error.messages.join(' ') || generic
    case 429:
      return TOO_MANY_ATTEMPTS
    default:
      return generic
  }
}

/** Un 400 trae el motivo en español: "El enlace de recuperación es inválido o ha expirado." o el de validación. */
export function resetPasswordErrorMessage(error: unknown): string {
  const generic = 'No se pudo restablecer la contraseña. Inténtalo de nuevo más tarde.'
  if (!(error instanceof ApiError)) return generic

  switch (error.status) {
    case 0:
      return CONNECTION
    case 400:
      return error.messages.join(' ') || generic
    case 429:
      return TOO_MANY_ATTEMPTS
    default:
      return generic
  }
}
