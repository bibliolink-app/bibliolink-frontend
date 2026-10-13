import { z } from 'zod'

import i18n from '@/i18n'
import { emailSchema } from './emailSchema'

// Sin reglas de fortaleza (letra/número/símbolo): en el login solo se exige
// la longitud mínima, esas reglas completas aplican al registro y al restablecimiento, no a cuentas existentes.
export const loginSchema = z.object({
  email: emailSchema,

  // Sin `trim`: los espacios pueden formar parte de la contraseña.
  password: z
    .string()
    .min(1, { error: () => i18n.t('auth:validation.password.required'), abort: true })
    .min(8, { error: () => i18n.t('auth:validation.password.minLength') }),
})

export type LoginInput = z.output<typeof loginSchema>
