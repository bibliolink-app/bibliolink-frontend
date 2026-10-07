
export interface Libro {
  providerCode: string
  externalReference: string
  title: string
  description: string | null
  coverUrl: string | null
  authors: string[]
  languageCodes: string[]
}

export interface PaginaLibros {
  libros: Libro[]
  pagina: number
  hayMas: boolean
  total: number | null
 
  noDisponibles: string[]
}
