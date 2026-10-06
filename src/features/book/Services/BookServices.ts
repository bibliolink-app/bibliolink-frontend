import { http } from '../../../api'
import type { Libro } from '../Models/BookModels'
import { libroSchema, librosSchema } from '../Schemas/BookSchemas'
import { CatalogoNoDisponibleError } from '../lib/bookErrorMessage'

export const getBooks = async (): Promise<Libro[]> => {
  const response = await http.get('/books')

  const resultado = librosSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}

export const getBookById = async (bookId: number): Promise<Libro> => {
  const response = await http.get(`/books/${bookId}`)

  const resultado = libroSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}
