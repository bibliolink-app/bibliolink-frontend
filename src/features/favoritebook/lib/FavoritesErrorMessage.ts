import { ApiError } from '../../../api'

const GENERIC = 'No se pudieron cargar tus favoritos.'

export function favoritesErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión.'
    case 401:
      return 'Tu sesión expiró. Vuelve a iniciar sesión.'
    case 403:
    case 409:
      return error.messages.join(' ') || GENERIC
    case 404:
      return 'Ese libro no existe.'
    default:
      return GENERIC
  }
}