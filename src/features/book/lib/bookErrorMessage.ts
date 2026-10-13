import i18n from '../../../i18n'
import { ApiError } from '../../../api'

export class CatalogoNoDisponibleError extends Error {
  constructor() {
    super(i18n.t('book:errors.catalogUnavailable'))
    this.name = 'CatalogoNoDisponibleError'
  }
}

export function bookErrorMessage(error: unknown): string {
  if (error instanceof CatalogoNoDisponibleError) {
    return i18n.t('book:errors.catalogUnavailableHint')
  }

  if (!(error instanceof ApiError)) return i18n.t('book:errors.catalogGeneric')

  switch (error.status) {
    case 0:
      return i18n.t('user:errors.network')
    case 400:
      return error.messages.join(' ') || i18n.t('book:errors.catalogGeneric')
    case 401:
      return i18n.t('book:errors.sessionExpired')
    case 404:
      return i18n.t('book:errors.bookNotFound')
    default:
      return i18n.t('book:errors.catalogGeneric')
  }
}
