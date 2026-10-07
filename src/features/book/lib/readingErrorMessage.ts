import { ApiError } from '../../../api'

export class LecturaNoDisponibleError extends Error {
  constructor() {
    super('No se pudo abrir el libro.')
    this.name = 'LecturaNoDisponibleError'
  }
}

const GENERIC = 'No se pudo abrir el libro.'

export function readingErrorMessage(error: unknown): string {
  if (error instanceof LecturaNoDisponibleError) return error.message

  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión.'
    case 401:
      return 'Tu sesión expiró. Vuelve a iniciar sesión.'
    case 403:
      return 'Tu cuenta no tiene permiso para leer este libro.'
    case 404:
      return 'No encontramos esa página del libro.'
    case 503:
      return 'El proveedor del contenido no responde. Inténtalo de nuevo en un momento.'
    default:
      return error.messages.join(' ') || GENERIC
  }
}
