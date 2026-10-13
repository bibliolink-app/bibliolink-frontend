/** Estante decorativo con libros. Es solo ornamento: se oculta a las tecnologías de asistencia. */
export function BookShelf() {
  return (
    <div aria-hidden="true" className="mt-auto w-full select-none">
      <div className="mx-auto flex max-w-3xl items-end justify-center gap-1 overflow-hidden px-4 *:shrink-0 *:rounded-t-sm *:border-r *:border-black/25">
        <span className="h-16 w-4 bg-mauve-600" />
        <span className="h-24 w-5 bg-rose-900" />
        <span className="h-20 w-4 bg-yellow-800" />
        <span className="h-28 w-6 bg-mauve-600" />
        <span className="h-20 w-5 bg-yellow-600" />
        <span className="h-24 w-4 bg-rose-900" />
        <span className="h-16 w-6 bg-yellow-800" />
        <span className="h-28 w-5 bg-mauve-600" />
        <span className="h-20 w-4 bg-rose-900" />
        <span className="h-24 w-6 bg-yellow-600" />
        <span className="h-16 w-5 bg-mauve-600" />
        <span className="h-28 w-4 bg-yellow-800" />
        <span className="h-20 w-6 bg-rose-900" />
        <span className="h-24 w-5 bg-mauve-600" />
        <span className="h-16 w-4 bg-yellow-600" />
        <span className="h-28 w-5 bg-rose-900" />
        <span className="h-20 w-6 bg-yellow-800" />
        <span className="h-24 w-4 bg-mauve-600" />
      </div>
      <div className="h-3.5 border-t border-yellow-600/50 bg-linear-to-b from-yellow-800 to-teal-950 shadow-lg" />
    </div>
  )
}
