import { api } from '../../../api'
import type { FavoritoAgregado, FavoritoQuitado, ListaFavoritos } from '../Models/FavoritesModels'
import { favoritoAgregadoSchema, favoritoQuitadoSchema, listaFavoritosSchema } from '../Schemas/FavoritesSchemas'

export const getFavorites = async (): Promise<ListaFavoritos> => {
  const response = await api.get('/favorites')

  return listaFavoritosSchema.parse(response.data)
}

export const addFavorite = async (bookId: number): Promise<FavoritoAgregado> => {
  const response = await api.post('/favorites', { bookId })

  return favoritoAgregadoSchema.parse(response.data)
}

export const removeFavorite = async (bookId: number): Promise<FavoritoQuitado> => {
  const response = await api.delete(`/favorites/books/${bookId}`)

  return favoritoQuitadoSchema.parse(response.data)
}
