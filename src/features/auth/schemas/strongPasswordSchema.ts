import { z } from 'zod'


export const strongPasswordSchema = z
  .string()
  .min(1, { error: 'La contraseña es obligatoria.', abort: true })
  .refine(
    (value) =>
      Array.from(value).length >= 8 &&
      new TextEncoder().encode(value).length <= 72 &&
      /\p{L}/u.test(value) &&
      /\p{N}/u.test(value) &&
      /[\p{P}\p{S}]/u.test(value),
    { error: 'La contraseña debe tener al menos 8 caracteres, una letra, un número y un símbolo, y no superar 72 bytes.' },
  )
