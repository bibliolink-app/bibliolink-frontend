import { ApiError } from '../../../api'

const GENERIC = 'No se pudo iniciar la suscripción. Inténtalo de nuevo más tarde.'

export function subscribeErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
    case 403:
      return 'Tu cuenta no está activa.'
    case 409:
      // Una reserva PENDING abandonada (o una suscripción vigente) bloquea nuevos intentos.
      return 'Ya tienes una suscripción vigente o en proceso.'
    default:
      return GENERIC
  }
}
