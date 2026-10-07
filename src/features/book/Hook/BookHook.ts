import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getBook, getBooks } from '../Services/BookServices'

export const useBooks = (pagina: number, query?: string) => {
  return useQuery({
    queryKey: ['books', 'search', pagina, query ?? ''],
    queryFn: () => getBooks(pagina, query),
    staleTime: 5 * 60 * 1000, // 5 minutos
    // Al cambiar de página conserva la anterior en pantalla y evita el parpadeo.
    placeholderData: keepPreviousData,
  })
}

export const useBook = (reference: string) => {
  return useQuery({
    queryKey: ['books', 'detail', reference],
    queryFn: () => getBook(reference),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: reference.length > 0,
  })
}
