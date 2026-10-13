import { z } from 'zod'

import i18n from '@/i18n'

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: () => i18n.t('auth:validation.email.required') })
  .max(254, { error: () => i18n.t('auth:validation.email.tooLong') })
  .pipe(z.email({ error: () => i18n.t('auth:validation.email.invalid') }))
