import { ApiError } from '../../../api'

const GENERIC = 'No se pudieron cargar las estadísticas.'

export function analyticsErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión.'
    case 400:
      return error.messages.join(' ') || GENERIC
    case 403:
      return 'No tienes permisos para ver estas estadísticas.'
    default:
      return GENERIC
  }
}
