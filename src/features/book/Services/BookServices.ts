import { api } from '../../../api'
import type { Libro, PaginaLibros } from '../Models/BookModels'
import { busquedaSchema, libroSchema } from '../Schemas/BookSchemas'
import { CatalogoNoDisponibleError } from '../lib/bookErrorMessage'


const PROVEEDOR = 'gutendex'
const IDIOMA = 'es'

export const getBooks = async (pagina: number, query?: string): Promise<PaginaLibros> => {
  const response = await api.get('/catalogs/search', {
    params: {
      provider: PROVEEDOR,
      language: IDIOMA,
      page: pagina,
      query: query?.trim() || undefined,
    },
  })

  const resultado = busquedaSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  const datos = resultado.data
  // La respuesta agrupa por proveedor; aquí solo pedimos uno.
  const paginaProveedor = datos.results.find((item) => item.providerCode === PROVEEDOR)

  return {
    libros: paginaProveedor?.items ?? [],
    pagina: datos.page,
    hayMas: paginaProveedor?.hasNextPage ?? false,
    total: paginaProveedor?.totalItems ?? null,
    noDisponibles: datos.unavailableProviders,
  }
}

export const getBook = async (reference: string): Promise<Libro> => {
  const response = await api.get(`/catalogs/providers/${PROVEEDOR}/book`, {
    params: { reference },
  })

  const resultado = libroSchema.safeParse(response.data)
  if (!resultado.success) throw new CatalogoNoDisponibleError()

  return resultado.data
}
