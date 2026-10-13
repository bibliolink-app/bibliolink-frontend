import i18n from '../../../i18n'
import { ApiError } from '../../../api'

/** Traduce los errores del backend a un mensaje que el administrador pueda entender. */
export function userErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('user:errors.unexpected')

  switch (error.status) {
    case 0:
      return i18n.t('user:errors.network')
    case 400:
      // El backend devuelve un array con un mensaje por cada campo inválido.
      return error.messages.join(' ')
    case 403:
      return i18n.t('user:errors.forbidden')
    case 409:
      return error.messages[0] ?? i18n.t('user:errors.conflict')
    default:
      return error.messages[0] ?? i18n.t('user:errors.generic')
  }
}
