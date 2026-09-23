import { ApiError } from '../../../api'

const GENERIC = 'No se pudo crear la cuenta. Inténtalo de nuevo más tarde.'

export function registerErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
    case 400:
      // Aquí cae también el CAPTCHA rechazado por el backend.
      return error.messages.join(' ') || GENERIC
    case 409:
      // El correo o el nombre de usuario ya están registrados.
      return error.messages[0] ?? 'Esos datos ya están registrados.'
    case 429:
      // El throttler del backend responde en inglés: se traduce aquí.
      return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'
    case 503:
      // El backend no pudo contactar con Cloudflare para verificar el CAPTCHA.
      return 'La verificación de seguridad no está disponible. Inténtalo más tarde.'
    default:
      return GENERIC
  }
}
