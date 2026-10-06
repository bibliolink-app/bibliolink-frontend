// Basado en la entidad Book del backend y en la forma de sus DTOs de respuesta.
export interface Libro {
  bookId: number
  title: string
  description: string | null
  coverUrl: string | null
  /** URL del archivo EPUB. */
  contentReference: string | null
  authors: string[]
  languages: string[]
}
