import { z } from 'zod'

export const estadoLecturaSchema = z.object({
  progressPercent: z.number(),
  readingLocation: z.string().nullable(),
  lastReadAt: z.string().nullable(),
})

export const accesoLecturaSchema = z.object({
  membership: z.enum(['FREE', 'PREMIUM']),
  canRead: z.boolean(),
  requiresReward: z.boolean(),
  expiresAt: z.string().nullable(),
  serverTime: z.string(),
  readingState: estadoLecturaSchema.nullable(),
})

export const paginaLecturaSchema = z.object({
  pageNumber: z.number().int().positive(),
  contentType: z.enum(['HTML', 'IMAGE']),
  content: z.string(),
  hasNextPage: z.boolean(),
})

export const retoRecompensaSchema = z.object({
  token: z.string(),
  expiresAt: z.string(),
})

export const recompensaLecturaSchema = z.object({
  canRead: z.boolean(),
  expiresAt: z.string(),
  serverTime: z.string(),
})
