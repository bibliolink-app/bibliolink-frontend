import { api } from '../../../api'
import type { AccesoLectura, PaginaLectura } from '../Models/ReadingModels'
import { accesoLecturaSchema, paginaLecturaSchema } from '../Schemas/ReadingSchemas'
import { LecturaNoDisponibleError } from '../lib/readingErrorMessage'

// Es POST porque abre un periodo de lectura en el servidor, no solo consulta.
export const postAccess = async (bookId: number): Promise<AccesoLectura> => {
  const response = await api.post(`/reading/books/${bookId}/access`)

  const resultado = accesoLecturaSchema.safeParse(response.data)
  if (!resultado.success) throw new LecturaNoDisponibleError()

  return resultado.data
}

export const getPage = async (bookId: number, pageNumber: number): Promise<PaginaLectura> => {
  const response = await api.get(`/reading/books/${bookId}/pages/${pageNumber}`)

  const resultado = paginaLecturaSchema.safeParse(response.data)
  if (!resultado.success) throw new LecturaNoDisponibleError()

  return resultado.data
}
