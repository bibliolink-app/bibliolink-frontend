import { z } from 'zod'

import i18n from '@/i18n'

export const strongPasswordSchema = z
  .string()
  .min(1, { error: () => i18n.t('auth:validation.password.required'), abort: true })
  .refine(
    (value) =>
      Array.from(value).length >= 8 &&
      new TextEncoder().encode(value).length <= 72 &&
      /\p{L}/u.test(value) &&
      /\p{N}/u.test(value) &&
      /[\p{P}\p{S}]/u.test(value),
    { error: () => i18n.t('auth:validation.password.combined') },
  )
