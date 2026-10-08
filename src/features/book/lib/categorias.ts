import type { Libro } from '../Models/BookModels'

export interface CategoriaConConteo {
  code: string
  nombre: string
  cantidad: number
}


const MINIMO_LIBROS = 2

export function categoriasDeLibros(libros: Libro[]): CategoriaConConteo[] {
  const conteo = new Map<string, CategoriaConConteo>()

  for (const libro of libros) {
    for (const categoria of libro.categories) {
      const actual = conteo.get(categoria.code)

      conteo.set(categoria.code, {
        code: categoria.code,
        nombre: categoria.name,
        cantidad: (actual?.cantidad ?? 0) + 1,
      })
    }
  }

  return [...conteo.values()]
    .filter((categoria) => categoria.cantidad >= MINIMO_LIBROS)
    .sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre, 'es'))
}

/** Deja solo los libros de una categoría. Con cadena vacía devuelve todo. */
export function filtrarPorCategoria(libros: Libro[], code: string): Libro[] {
  if (code === '') return libros

  return libros.filter((libro) =>
    libro.categories.some((categoria) => categoria.code === code),
  )
}