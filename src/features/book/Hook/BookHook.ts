import { useQuery } from '@tanstack/react-query'

import { getBookById, getBooks } from '../Services/BookServices'

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 5 * 60 * 1000, // 5 minutos
    // Mientras el backend no devuelva libros el fallo es seguro, no vale reintentar.
    retry: false,
  })
}

export const useBook = (bookId: number) => {
  return useQuery({
    queryKey: ['books', bookId],
    queryFn: () => getBookById(bookId),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
    enabled: Number.isInteger(bookId) && bookId > 0,
  })
}
