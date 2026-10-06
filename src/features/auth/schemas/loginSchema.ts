import { z } from 'zod'

import i18n from '@/i18n'
import { emailSchema } from './emailSchema'

// Sin reglas de fortaleza: en el login solo se exige que haya contraseña,
// esas reglas aplican al registro y al restablecimiento, no a cuentas existentes.
export const loginSchema = z.object({
  email: emailSchema,

  // Sin `trim`: los espacios pueden formar parte de la contraseña.
  password: z.string().min(1, { error: () => i18n.t('auth:validation.password.required') }),
})

export type LoginInput = z.output<typeof loginSchema>
