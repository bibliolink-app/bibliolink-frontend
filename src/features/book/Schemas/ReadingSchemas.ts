import { z } from 'zod'

const estadoLecturaSchema = z.object({
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
