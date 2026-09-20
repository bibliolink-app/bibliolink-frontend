import { ApiError } from '../../../api'

const GENERIC = 'No se pudo iniciar sesión. Inténtalo de nuevo más tarde.'


export function loginErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
    case 400:
      return error.messages.join(' ') || GENERIC
    case 401:
      return 'Credenciales incorrectas.'
    case 429:
      // El throttler del backend responde en inglés: se traduce aquí.
      return 'Demasiados intentos. Espera un minuto e inténtalo de nuevo.'
    default:
      return GENERIC
  }
}
