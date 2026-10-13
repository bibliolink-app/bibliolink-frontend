export interface IdiomaLibro {
  languageCode: string
  name: string
}
export interface CategoriaLibro {
  code: string
  name: string
}

export interface Libro {
  bookId: number
  providerCode: string
  externalReference: string
  title: string
  description: string | null
  coverUrl: string | null
  authors: string[]
  languages: IdiomaLibro[]
  categories: CategoriaLibro[]
}
