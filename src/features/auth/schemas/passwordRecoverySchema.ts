import { z } from 'zod'

import i18n from '@/i18n'
import { emailSchema } from './emailSchema'
import { strongPasswordSchema } from './strongPasswordSchema'

// Los dos pasos de recuperar la contraseña.

// Paso 1. Refleja `ForgotPasswordDto` del backend: solo el correo.
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordInput = z.output<typeof forgotPasswordSchema>

// Paso 2. Lo que valida el formulario. `confirmPassword` es solo del cliente
export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, { error: () => i18n.t('auth:validation.confirmPassword.required') }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    error: () => i18n.t('auth:validation.confirmPassword.mismatch'),
    path: ['confirmPassword'],
  })


export interface ResetPasswordInput {
  token: string
  newPassword: string
}
