import type { Libro } from '../Models/BookModels'


function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export function filtrarLibros(libros: Libro[], busqueda: string): Libro[] {
  const termino = normalizar(busqueda.trim())
  if (termino === '') return libros

  return libros.filter((libro) =>
    normalizar(`${libro.title} ${libro.authors.join(' ')}`).includes(termino),
  )
}
