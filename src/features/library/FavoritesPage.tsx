import { Library } from 'lucide-react'


export function FavoritesPage() {
  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Favoritos</h1>
        <p className="mt-2 text-stone-300">Los libros que guardas para tenerlos siempre a mano.</p>
      </header>

      <div className="grid place-items-center gap-3 rounded-lg bg-stone-300 px-4 py-14 text-center">
        <Library className="size-10 text-stone-600" />
        <p className="font-serif text-xl font-semibold text-stone-900">Todavía no hay favoritos</p>
        <p className="max-w-sm text-stone-600">
          Cuando el catálogo esté disponible, los libros que guardes aparecerán aquí.
        </p>
      </div>
    </>
  )
}
