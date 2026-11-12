import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { favoritesErrorMessage } from '../lib/FavoritesErrorMessage'
import { addFavorite, getFavorites, removeFavorite } from '../Services/FavoritesServices'

const CLAVE = ['favorites'] as const

export const useFavoritos = () => {
  return useQuery({
    queryKey: CLAVE,
    queryFn: getFavorites,
    staleTime: 60 * 1000, // 1 minuto
  })
}

export const useEsFavorito = (bookId: number) => {
  const { data, isPending } = useFavoritos()

  return {
    esFavorito: data?.items.some((favorito) => favorito.bookId === bookId) ?? false,
    isPending,
  }
}

export const useAgregarFavorito = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: ({ message }) => {
      void queryClient.invalidateQueries({ queryKey: CLAVE })
      toast.success(message)
    },
    onError: (error) => toast.error(favoritesErrorMessage(error)),
  })
}

export const useQuitarFavorito = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: ({ message }) => {
      void queryClient.invalidateQueries({ queryKey: CLAVE })
      toast.success(message)
    },
    onError: (error) => toast.error(favoritesErrorMessage(error)),
  })
}