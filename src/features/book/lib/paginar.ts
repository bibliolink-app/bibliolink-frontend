
export const LIBROS_POR_PAGINA = 20

export function totalDePaginas(total: number): number {
  return Math.max(1, Math.ceil(total / LIBROS_POR_PAGINA))
}

export function paginar<T>(items: T[], pagina: number): T[] {
  const inicio = (pagina - 1) * LIBROS_POR_PAGINA

  return items.slice(inicio, inicio + LIBROS_POR_PAGINA)
}