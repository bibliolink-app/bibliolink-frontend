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

/** Al agregar, el backend añade el mensaje de confirmación ya traducido. */
export interface FavoritoAgregado extends Favorito {
  message: string
}

/** Al quitar, el backend responde con el id y el mensaje de confirmación ya traducido. */
export interface FavoritoQuitado {
  bookId: number
  message: string
}

/** La lista viene con el estado del cupo, para mostrar "2 de 3". */
export interface ListaFavoritos {
  plan: PlanUsuario
  limit: number
  count: number
  remaining: number
  items: Favorito[]
}