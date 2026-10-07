import type { Libro } from '../Models/BookModels'

export interface CategoriaConConteo {
  nombre: string
  cantidad: number
}

export function nombreVisible(categoria: string): string {
  return categoria.replace(/^Category:\s*/i, '')
}

export function categoriasDeLibros(libros: Libro[]): CategoriaConConteo[] {
  const conteo = new Map<string, number>()

  for (const libro of libros) {
    for (const categoria of libro.categories) {
         if (!categoria.toLowerCase().startsWith('category:')) continue 
      conteo.set(categoria, (conteo.get(categoria) ?? 0) + 1)
    }
  }

  return [...conteo.entries()]
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
    .filter((categoria) => categoria.cantidad >= 2)  
    .sort(
      (a, b) =>
        b.cantidad - a.cantidad ||
        nombreVisible(a.nombre).localeCompare(nombreVisible(b.nombre), 'es'),
    )
}


export function filtrarPorCategoria(libros: Libro[], categoria: string): Libro[] {
  if (categoria === '') return libros

  return libros.filter((libro) => libro.categories.includes(categoria))
}