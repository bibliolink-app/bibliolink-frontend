import { z } from 'zod'


export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: 'El correo electrónico es obligatorio.' })
  .max(254, { error: 'El correo electrónico no puede superar los 254 caracteres.' })
  .pipe(z.email({ error: 'Ingresa un correo electrónico válido.' }))
