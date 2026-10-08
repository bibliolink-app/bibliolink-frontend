import i18n from '../../../i18n'
import { ApiError } from '../../../api'

export class LecturaNoDisponibleError extends Error {
  constructor() {
    super(i18n.t('book:errors.readingUnavailable'))
    this.name = 'LecturaNoDisponibleError'
  }
}

export function readingErrorMessage(error: unknown): string {
  if (error instanceof LecturaNoDisponibleError) return error.message

  if (!(error instanceof ApiError)) return i18n.t('book:errors.readingUnavailable')

  switch (error.status) {
    case 0:
      return i18n.t('user:errors.network')
    case 401:
      return i18n.t('book:errors.sessionExpired')
    case 403:
      return i18n.t('book:errors.readingForbidden')
    case 404:
      return i18n.t('book:errors.pageNotFound')
    case 503:
      return i18n.t('book:errors.providerUnavailable')
    default:
      return error.messages.join(' ') || i18n.t('book:errors.readingUnavailable')
  }
}
