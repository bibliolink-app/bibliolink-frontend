import { api } from '../../../api'
import type { AccesoLectura, EstadoLectura, PaginaLectura, ProgresoLectura } from '../Models/ReadingModels'
import { accesoLecturaSchema, estadoLecturaSchema, paginaLecturaSchema } from '../Schemas/ReadingSchemas'
import { LecturaNoDisponibleError } from '../lib/readingErrorMessage'

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

export const saveProgress = async (
  bookId: number,
  data: ProgresoLectura,
): Promise<EstadoLectura> => {
  const response = await api.patch(`/favorites/books/${bookId}/progress`, data)

  const resultado = estadoLecturaSchema.safeParse(response.data)
  if (!resultado.success) throw new LecturaNoDisponibleError()

  return resultado.data
}