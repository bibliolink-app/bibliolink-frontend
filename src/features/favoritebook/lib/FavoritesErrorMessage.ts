import i18n from '../../../i18n'
import { ApiError } from '../../../api'

export function favoritesErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('book:errors.favoritesGeneric')

  switch (error.status) {
    case 0:
      return i18n.t('user:errors.network')
    case 401:
      return i18n.t('book:errors.sessionExpired')
    case 403:
    case 409:
      return error.messages.join(' ') || i18n.t('book:errors.favoritesGeneric')
    case 404:
      return i18n.t('book:errors.favoriteBookNotFound')
    default:
      return i18n.t('book:errors.favoritesGeneric')
  }
}