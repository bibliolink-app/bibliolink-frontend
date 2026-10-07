import { z } from 'zod'

const textoOpcional = z
  .string()
  .nullish()
  .transform((valor) => valor ?? null)

const listaDeTextos = z
  .array(z.string())
  .nullish()
  .transform((valor) => valor ?? [])

export const libroSchema = z.object({
  providerCode: z.string(),
  externalReference: z.string(),
  title: z.string(),
  description: textoOpcional,
  coverUrl: textoOpcional,
  authors: listaDeTextos,
  languageCodes: listaDeTextos,
})

const paginaProveedorSchema = z.object({
  providerCode: z.string(),
  items: z.array(libroSchema),
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number().nullable(),
  hasNextPage: z.boolean(),
})

export const busquedaSchema = z.object({
  query: z.string(),
  page: z.number(),
  pageSize: z.number(),
  results: z.array(paginaProveedorSchema),
  unavailableProviders: z.array(z.string()),
})
