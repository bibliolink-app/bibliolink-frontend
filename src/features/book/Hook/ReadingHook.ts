import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { getPage, postAccess, saveProgress } from '../Services/ReadingServices'
import type { ProgresoLectura } from '../Models/ReadingModels'

/** Abre el periodo de lectura y dice si se puede leer o hace falta un anuncio. */
export const useReadingAccess = (bookId: number) => {
  return useQuery({
    queryKey: ['reading', bookId, 'access'],
    queryFn: () => postAccess(bookId),
    enabled: Number.isInteger(bookId) && bookId > 0,
    // El permiso caduca con el tiempo, así que no se guarda en caché.
    staleTime: 0,
    retry: false,
  })
}

export const useReadingPage = (bookId: number, pageNumber: number, habilitado: boolean) => {
  return useQuery({
    queryKey: ['reading', bookId, 'page', pageNumber],
    queryFn: () => getPage(bookId, pageNumber),
    enabled: habilitado && Number.isInteger(bookId) && bookId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
    // Al pasar de página conserva la anterior y evita el parpadeo.
    placeholderData: keepPreviousData,
  })
}

export const useGuardarProgreso = (bookId: number) => {
  return useMutation({
    mutationFn: (data: ProgresoLectura) => saveProgress(bookId, data),
    retry: false,
  })
}