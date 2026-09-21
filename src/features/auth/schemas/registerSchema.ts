import { z } from 'zod'



const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { error: `${label} es obligatorio.` })
    .max(50, { error: `${label} no puede superar los 50 caracteres.` })


const optionalName = (label: string) =>
  z
    .string()
    .trim()
    .max(50, { error: `${label} no puede superar los 50 caracteres.` })
    .transform((value) => (value === '' ? null : value))

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: 'El nombre de usuario es obligatorio.' })
    .max(25, { error: 'El nombre de usuario no puede superar los 25 caracteres.' }),

  firstName: name('El primer nombre'),
  middleName: optionalName('El segundo nombre'),
  firstSurname: name('El primer apellido'),
  secondSurname: optionalName('El segundo apellido'),

  // formato exacto y fecha que exista de verdad.
  birthDate: z
    .string()
    .trim()
    .min(1, { error: 'La fecha de nacimiento es obligatoria.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'La fecha debe tener el formato AAAA-MM-DD.' })
    .refine(
      (value) => {
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        // Un día inexistente (31 de febrero) desborda al mes siguiente y deja de coincidir.
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
      },
      { error: 'Esa fecha no existe.' },
    )
    .refine((value) => new Date(value) <= new Date(), {
      error: 'La fecha de nacimiento no puede ser futura.',
    }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: 'El correo electrónico es obligatorio.' })
    .max(254, { error: 'El correo electrónico no puede superar los 254 caracteres.' })
    .pipe(z.email({ error: 'Ingresa un correo electrónico válido.' })),

  
  password: z
    .string()
    .refine((value) => Array.from(value).length >= 8, {
      error: 'La contraseña debe tener al menos 8 caracteres.',
    })
    .refine((value) => /\p{L}/u.test(value), {
      error: 'La contraseña debe incluir al menos una letra.',
    })
    .refine((value) => /\p{N}/u.test(value), {
      error: 'La contraseña debe incluir al menos un número.',
    })
    .refine((value) => /[\p{P}\p{S}]/u.test(value), {
      error: 'La contraseña debe incluir al menos un carácter especial.',
    })
    .refine((value) => new TextEncoder().encode(value).length <= 72, {
      error: 'La contraseña es demasiado larga.',
    }),

  captchaToken: z
    .string()
    .min(1, { error: 'Completa la verificación de seguridad.' })
    .max(4096),
})


export const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.output<typeof registerSchema>
