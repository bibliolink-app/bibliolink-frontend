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

/** Respuesta de agregar: el favorito más el mensaje ya traducido por el backend (según `Accept-Language`). */
export const favoritoAgregadoSchema = favoritoSchema.extend({ message: z.string() })

/** Respuesta de quitar: confirmación traducida por el backend. */
export const favoritoQuitadoSchema = z.object({
  bookId: z.number().int().positive(),
  message: z.string(),
})

export const listaFavoritosSchema = z.object({
  plan: z.enum(['FREE', 'PREMIUM']),
  limit: z.number().int(),
  count: z.number().int(),
  remaining: z.number().int(),
  items: z.array(favoritoSchema),
})