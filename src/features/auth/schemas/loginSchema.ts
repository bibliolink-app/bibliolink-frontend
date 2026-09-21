import { z } from 'zod'

import { emailSchema } from './emailSchema'

// Sin reglas de fortaleza: en el login solo se exige que haya contraseña,
// esas reglas aplican al registro y al restablecimiento, no a cuentas existentes.
export const loginSchema = z.object({
  email: emailSchema,

  // Sin `trim`: los espacios pueden formar parte de la contraseña.
  password: z.string().min(1, { error: 'La contraseña es obligatoria.' }),
})

export type LoginInput = z.output<typeof loginSchema>
