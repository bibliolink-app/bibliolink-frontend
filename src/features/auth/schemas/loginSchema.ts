import { z } from 'zod'

// Refleja `LoginDto` del backend. Sin reglas de fortaleza: en el login solo se exige que haya contraseña,
// esas reglas aplican al registro y al restablecimiento, no a cuentas existentes.
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: 'El correo electrónico es obligatorio.' })
    .max(254, { error: 'El correo electrónico no puede superar los 254 caracteres.' })
    .pipe(z.email({ error: 'Ingresa un correo electrónico válido.' })),

  password: z.string().min(1, { error: 'La contraseña es obligatoria.' }),
})

export type LoginInput = z.output<typeof loginSchema>
