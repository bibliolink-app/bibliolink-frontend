import { z } from 'zod'

// Los opcionales se aceptan ausentes o nulos y se dejan en null.
const textoOpcional = z
  .string()
  .nullish()
  .transform((valor) => valor ?? null)

export const libroSchema = z.object({
  bookId: z.number().int().positive(),
  title: z.string(),
  description: textoOpcional,
  coverUrl: textoOpcional,
  contentReference: textoOpcional,
  authors: z
    .array(z.string())
    .nullish()
    .transform((valor) => valor ?? []),
  languages: z
    .array(z.string())
    .nullish()
    .transform((valor) => valor ?? []),
})

export const librosSchema = z.array(libroSchema)
