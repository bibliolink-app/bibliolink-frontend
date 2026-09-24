import { Search } from 'lucide-react'

/**
 * Búsqueda del catálogo. El campo ya está habilitado, pero todavía no consulta nada:
 * falta el endpoint de libros del backend, que será quien hable con el proveedor externo.
 */
export function SearchPage() {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Buscar</h1>
        <p className="mt-2 text-stone-300">Encuentra libros por título, autor o categoría.</p>
      </header>

      <div className="relative max-w-xl">
        <Search className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone-600" />
        <input
          type="search"
          placeholder="Busca por título, autor o categoría"
          aria-label="Buscar libros"
          className="w-full rounded-md border border-stone-500 bg-stone-100 py-3 pr-3.5 pl-11 text-base text-stone-900 shadow-inner shadow-black/5 hover:border-yellow-800 focus-visible:border-yellow-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 motion-safe:transition-colors"
        />
      </div>
    </>
  )
}
