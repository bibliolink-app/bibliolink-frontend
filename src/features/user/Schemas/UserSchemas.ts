import { z } from 'zod'

import i18n from '../../../i18n'

const contrasenaFuerte = z
  .string()
  .refine((valor) => Array.from(valor).length >= 8, {
    error: () => i18n.t('user:validation.password.minLength'),
  })
  .refine((valor) => /\p{L}/u.test(valor), {
    error: () => i18n.t('user:validation.password.needsLetter'),
  })
  .refine((valor) => /\p{N}/u.test(valor), {
    error: () => i18n.t('user:validation.password.needsNumber'),
  })
  .refine((valor) => /[\p{P}\p{S}]/u.test(valor), {
    error: () => i18n.t('user:validation.password.needsSpecial'),
  })
  .refine((valor) => new TextEncoder().encode(valor).length <= 72, {
    error: () => i18n.t('user:validation.password.tooLong'),
  })

/** valida que la fech aexista . */
const fechaLocal = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: () => i18n.t('user:validation.date.format') })
  .refine(
    (valor) => {
      const [anio, mes, dia] = valor.split('-').map(Number)
      const fecha = new Date(anio, mes - 1, dia)
      // Un día inexistente (31 de febrero) desborda al mes siguiente y deja de coincidir.
      return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
    },
    { error: () => i18n.t('user:validation.date.invalid') },
  )

const correo = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: () => i18n.t('user:validation.email.required') })
  .max(254, { error: () => i18n.t('user:validation.email.tooLong') })
  .pipe(z.email({ error: () => i18n.t('user:validation.email.invalid') }))

const nombreUsuario = z
  .string()
  .trim()
  .min(1, { error: () => i18n.t('user:validation.username.required') })
  .max(25, { error: () => i18n.t('user:validation.username.tooLong') })

const nombreObligatorio = (labelKey: 'firstName' | 'firstSurname') =>
  z
    .string()
    .trim()
    .min(1, { error: () => i18n.t('user:validation.required', { label: i18n.t(`user:fields.${labelKey}`) }) })
    .max(50, { error: () => i18n.t('user:validation.tooLong50', { label: i18n.t(`user:fields.${labelKey}`) }) })


const nombreOpcional = (labelKey: 'middleName' | 'secondSurname') =>
  z
    .string()
    .trim()
    .max(50, { error: () => i18n.t('user:validation.tooLong50', { label: i18n.t(`user:fields.${labelKey}`) }) })
    .transform((valor) => (valor === '' ? null : valor))

// ─── Esquemas ───

/** Valida el formulario de admi */
export const crearAdminSchema = z.object({
  username: nombreUsuario,
  firstName: nombreObligatorio('firstName'),
  middleName: nombreOpcional('middleName'),
  firstSurname: nombreObligatorio('firstSurname'),
  secondSurname: nombreOpcional('secondSurname'),
  birthDate: fechaLocal,
  email: correo,
  password: contrasenaFuerte,
})

/** Valida el formulario */
export const actualizarUsuarioSchema = z.object({
  username: nombreUsuario.optional(),
  firstName: nombreObligatorio('firstName').optional(),
  middleName: nombreOpcional('middleName').optional(),
  firstSurname: nombreObligatorio('firstSurname').optional(),
  secondSurname: nombreOpcional('secondSurname').optional(),
  birthDate: fechaLocal.optional(),
  email: correo.optional(),
})

export type CrearAdminInput = z.output<typeof crearAdminSchema>
export type ActualizarUsuarioInput = z.output<typeof actualizarUsuarioSchema>
