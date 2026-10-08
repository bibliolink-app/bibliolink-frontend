import { z } from 'zod'

const textoOpcional = z
  .string()
  .nullish()
  .transform((valor) => valor ?? null)

export const libroSchema = z.object({
  bookId: z.number().int().positive(),
  providerCode: z.string(),
  externalReference: z.string(),
  title: z.string(),
  description: textoOpcional,
  coverUrl: textoOpcional,
  authors: z
    .array(z.string())
    .nullish()
    .transform((valor) => valor ?? []),
  languages: z
    .array(z.object({ languageCode: z.string(), name: z.string() }))
    .nullish()
    .transform((valor) => valor ?? []),
  categories: z
    .array(z.object({ code: z.string(), name: z.string() }))
    .nullish()
    .transform((valor) => valor ?? []),
})

export const librosSchema = z.array(libroSchema)