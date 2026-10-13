import i18n from '../../../i18n'
import { ApiError } from '../../../api'

export function analyticsErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return i18n.t('graficos:errors.generic')

  switch (error.status) {
    case 0:
      return i18n.t('user:errors.network')
    case 400:
      return error.messages.join(' ') || i18n.t('graficos:errors.generic')
    case 403:
      return i18n.t('graficos:errors.forbidden')
    default:
      return i18n.t('graficos:errors.generic')
  }
}
