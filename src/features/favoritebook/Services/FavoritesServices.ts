import { api } from '../../../api'
import type { Favorito, ListaFavoritos } from '../Models/FavoritesModels'
import { favoritoSchema, listaFavoritosSchema } from '../Schemas/FavoritesSchemas'

export const getFavorites = async (): Promise<ListaFavoritos> => {
  const response = await api.get('/favorites')

  return listaFavoritosSchema.parse(response.data)
}

export const addFavorite = async (bookId: number): Promise<Favorito> => {
  const response = await api.post('/favorites', { bookId })

  return favoritoSchema.parse(response.data)
}

export const removeFavorite = async (bookId: number): Promise<void> => {
  await api.delete(`/favorites/books/${bookId}`)
}