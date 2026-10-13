import { z } from 'zod'

import { libroSchema } from '../../book/Schemas/BookSchemas'

export const favoritoSchema = z.object({
  favoriteId: z.number().int().positive(),
  bookId: z.number().int().positive(),
  progressPercent: z.number(),
  readingLocation: z.string().nullable(),
  addedAt: z.string(),
  lastReadAt: z.string().nullable(),
  book: libroSchema,
})

export const listaFavoritosSchema = z.object({
  plan: z.enum(['FREE', 'PREMIUM']),
  limit: z.number().int(),
  count: z.number().int(),
  remaining: z.number().int(),
  items: z.array(favoritoSchema),
})