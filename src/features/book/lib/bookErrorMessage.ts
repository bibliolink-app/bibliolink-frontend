import { ApiError } from '../../../api'

export class CatalogoNoDisponibleError extends Error {
  constructor() {
    super('El catálogo todavía no está disponible.')
    this.name = 'CatalogoNoDisponibleError'
  }
}

const GENERIC = 'No se pudo cargar el catálogo.'

export function bookErrorMessage(error: unknown): string {
  if (error instanceof CatalogoNoDisponibleError) {
    return 'El catálogo todavía no está disponible. Estamos trabajando en ello.'
  }

  if (!(error instanceof ApiError)) return GENERIC

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión.'
    case 400:
      return error.messages.join(' ') || GENERIC
    case 401:
      return 'Tu sesión expiró. Vuelve a iniciar sesión.'
    case 404:
      return 'No encontramos ese libro.'
    default:
      return GENERIC
  }
}
