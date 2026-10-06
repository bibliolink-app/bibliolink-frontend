import { z } from 'zod'

import i18n from '@/i18n'



const name = (field: 'firstName' | 'firstSurname') =>
  z
    .string()
    .trim()
    .min(1, { error: () => i18n.t(`auth:validation.${field}.required`) })
    .max(50, { error: () => i18n.t(`auth:validation.${field}.tooLong`) })


const optionalName = (field: 'middleName' | 'secondSurname') =>
  z
    .string()
    .trim()
    .max(50, { error: () => i18n.t(`auth:validation.${field}.tooLong`) })
    .transform((value) => (value === '' ? null : value))

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t('auth:validation.username.required') })
    .max(25, { error: () => i18n.t('auth:validation.username.tooLong') }),

  firstName: name('firstName'),
  middleName: optionalName('middleName'),
  firstSurname: name('firstSurname'),
  secondSurname: optionalName('secondSurname'),

  // formato exacto y fecha que exista de verdad.
  birthDate: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t('auth:validation.birthDate.required') })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: () => i18n.t('auth:validation.birthDate.format') })
    .refine(
      (value) => {
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        // Un día inexistente (31 de febrero) desborda al mes siguiente y deja de coincidir.
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
      },
      { error: () => i18n.t('auth:validation.birthDate.notExist') },
    )
    .refine((value) => new Date(value) <= new Date(), {
      error: () => i18n.t('auth:validation.birthDate.future'),
    }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: () => i18n.t('auth:validation.email.required') })
    .max(254, { error: () => i18n.t('auth:validation.email.tooLong') })
    .pipe(z.email({ error: () => i18n.t('auth:validation.email.invalid') })),


  password: z
    .string()
    .refine((value) => Array.from(value).length >= 8, {
      error: () => i18n.t('auth:validation.password.minLength'),
    })
    .refine((value) => /\p{L}/u.test(value), {
      error: () => i18n.t('auth:validation.password.needsLetter'),
    })
    .refine((value) => /\p{N}/u.test(value), {
      error: () => i18n.t('auth:validation.password.needsNumber'),
    })
    .refine((value) => /[\p{P}\p{S}]/u.test(value), {
      error: () => i18n.t('auth:validation.password.needsSymbol'),
    })
    .refine((value) => new TextEncoder().encode(value).length <= 72, {
      error: () => i18n.t('auth:validation.password.tooLong'),
    }),

  captchaToken: z
    .string()
    .min(1, { error: () => i18n.t('auth:validation.captcha.required') })
    .max(4096),
})


export const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    error: () => i18n.t('auth:validation.confirmPassword.mismatch'),
    path: ['confirmPassword'],
  })

export type RegisterInput = z.output<typeof registerSchema>
