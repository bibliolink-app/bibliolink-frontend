import { z } from 'zod'

// ─── Reglas reutilizables, copiadas de las validaciones del backend ───

/** Refleja IsStrongPassword: 8+ caracteres, letra, número, especial, máx. 72 bytes UTF-8. */
const contrasenaFuerte = z
  .string()
  .refine((valor) => Array.from(valor).length >= 8, {
    error: 'La contraseña debe tener al menos 8 caracteres.',
  })
  .refine((valor) => /\p{L}/u.test(valor), {
    error: 'La contraseña debe incluir al menos una letra.',
  })
  .refine((valor) => /\p{N}/u.test(valor), {
    error: 'La contraseña debe incluir al menos un número.',
  })
  .refine((valor) => /[\p{P}\p{S}]/u.test(valor), {
    error: 'La contraseña debe incluir al menos un carácter especial.',
  })
  .refine((valor) => new TextEncoder().encode(valor).length <= 72, {
    error: 'La contraseña es demasiado larga.',
  })

/** Refleja normalizeLocalDate: formato exacto y que la fecha exista de verdad. */
const fechaLocal = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'La fecha debe tener el formato AAAA-MM-DD.' })
  .refine(
    (valor) => {
      const [anio, mes, dia] = valor.split('-').map(Number)
      const fecha = new Date(anio, mes - 1, dia)
      // Un día inexistente (31 de febrero) desborda al mes siguiente y deja de coincidir.
      return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
    },
    { error: 'Esa fecha no existe.' },
  )

const correo = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: 'El correo electrónico es obligatorio.' })
  .max(254, { error: 'El correo electrónico no puede superar los 254 caracteres.' })
  .pipe(z.email({ error: 'Ingresa un correo electrónico válido.' }))

const nombreUsuario = z
  .string()
  .trim()
  .min(1, { error: 'El nombre de usuario es obligatorio.' })
  .max(25, { error: 'El nombre de usuario no puede superar los 25 caracteres.' })

const nombreObligatorio = (etiqueta: string) =>
  z
    .string()
    .trim()
    .min(1, { error: `${etiqueta} es obligatorio.` })
    .max(50, { error: `${etiqueta} no puede superar los 50 caracteres.` })

/** El backend acepta null pero rechaza cadena vacía: un input sin rellenar se convierte en null. */
const nombreOpcional = (etiqueta: string) =>
  z
    .string()
    .trim()
    .max(50, { error: `${etiqueta} no puede superar los 50 caracteres.` })
    .transform((valor) => (valor === '' ? null : valor))

// ─── Esquemas ───

/** Valida el formulario de POST /users/admins. */
export const crearAdminSchema = z.object({
  username: nombreUsuario,
  firstName: nombreObligatorio('El primer nombre'),
  middleName: nombreOpcional('El segundo nombre'),
  firstSurname: nombreObligatorio('El primer apellido'),
  secondSurname: nombreOpcional('El segundo apellido'),
  birthDate: fechaLocal,
  email: correo,
  password: contrasenaFuerte,
})

/** Valida el formulario de PATCH /users/:userId. Todo opcional. */
export const actualizarUsuarioSchema = z.object({
  username: nombreUsuario.optional(),
  firstName: nombreObligatorio('El primer nombre').optional(),
  middleName: nombreOpcional('El segundo nombre').optional(),
  firstSurname: nombreObligatorio('El primer apellido').optional(),
  secondSurname: nombreOpcional('El segundo apellido').optional(),
  birthDate: fechaLocal.optional(),
  email: correo.optional(),
})

export type CrearAdminInput = z.output<typeof crearAdminSchema>
export type ActualizarUsuarioInput = z.output<typeof actualizarUsuarioSchema>