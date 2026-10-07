import { api } from '../../../api'
import type { Libro } from '../Models/BookModels'
import { libroSchema, librosSchema } from '../Schemas/BookSchemas'
import { CatalogoNoDisponibleError } from '../lib/bookErrorMessage'

// Los libros ya importados a la base. Traen `bookId`, que es lo que
// necesitan lectura y favoritos; el catálogo externo no lo tiene.
export const getBooks = async (): Promise<Libro[]> => {
  const response = await api.get('/books')

  const resultado = librosSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}

export const getBook = async (bookId: number): Promise<Libro> => {
  const response = await api.get(`/books/${bookId}`)

  const resultado = libroSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}
