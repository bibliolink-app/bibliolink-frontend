import { ApiError } from '../../../api'

/** Traduce los errores del backend a un mensaje que el administrador pueda entender. */
export function userErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return 'Ha ocurrido un error inesperado.'

  switch (error.status) {
    case 0:
      return 'No se pudo conectar con el servidor. Revisa tu conexión.'
    case 400:
      // El backend devuelve un array con un mensaje por cada campo inválido.
      return error.messages.join(' ')
    case 403:
      return 'No tienes permisos para realizar esta acción.'
    case 409:
      return error.messages[0] ?? 'El correo o el nombre de usuario ya están registrados.'
    default:
      return error.messages[0] ?? 'No se pudo completar la operación.'
  }
}
