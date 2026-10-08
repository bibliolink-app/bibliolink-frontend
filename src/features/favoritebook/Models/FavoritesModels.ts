import type { Libro } from '../../book/Models/BookModels'

export type PlanUsuario = 'FREE' | 'PREMIUM'

export interface Favorito {
  favoriteId: number
  bookId: number
  progressPercent: number
  readingLocation: string | null
  addedAt: string
  lastReadAt: string | null
  book: Libro
}

/** La lista viene con el estado del cupo, para mostrar "2 de 3". */
export interface ListaFavoritos {
  plan: PlanUsuario
  limit: number
  count: number
  remaining: number
  items: Favorito[]
}