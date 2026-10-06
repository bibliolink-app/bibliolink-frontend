import { api } from '../../../api'
import type { Libro } from '../Models/BookModels'
import { libroSchema, librosSchema } from '../Schemas/BookSchemas'
import { CatalogoNoDisponibleError } from '../lib/bookErrorMessage'

export const getBooks = async (): Promise<Libro[]> => {
  const response = await api.get('/books')

  const resultado = librosSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}

export const getBookById = async (bookId: number): Promise<Libro> => {
  const response = await api.get(`/books/${bookId}`)

  const resultado = libroSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}
