import { useQuery } from '@tanstack/react-query'

import { getBook, getBooks } from '../Services/BookServices'

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useBook = (bookId: number) => {
  return useQuery({
    queryKey: ['books', bookId],
    queryFn: () => getBook(bookId),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: Number.isInteger(bookId) && bookId > 0,
  })
}
