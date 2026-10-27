import type { Libro } from '../Models/BookModels'

export interface CategoriaConConteo {
  code: string
  nombre: string
  cantidad: number
}

/** La misma firma reducida de `t` de i18next: alcanza para traducir por código con fallback. */
type Traducir = (key: string, options?: { defaultValue?: string }) => string

const MINIMO_LIBROS = 2

export function categoriasDeLibros(libros: Libro[], locale: string, t: Traducir): CategoriaConConteo[] {
  const conteo = new Map<string, CategoriaConConteo>()

  for (const libro of libros) {
    for (const categoria of libro.categories) {
      const actual = conteo.get(categoria.code)
      const nombre = t(`book:categories.names.${categoria.code}`, { defaultValue: categoria.name })

      conteo.set(categoria.code, {
        code: categoria.code,
        nombre,
        cantidad: (actual?.cantidad ?? 0) + 1,
      })
    }
  }

  return [...conteo.values()]
    .filter((categoria) => categoria.cantidad >= MINIMO_LIBROS)
    .sort((a, b) => b.cantidad - a.cantidad || a.nombre.localeCompare(b.nombre, locale))
}

/** Deja solo los libros de una categoría. Con cadena vacía devuelve todo. */
export function filtrarPorCategoria(libros: Libro[], code: string): Libro[] {
  if (code === '') return libros

  return libros.filter((libro) =>
    libro.categories.some((categoria) => categoria.code === code),
  )
}