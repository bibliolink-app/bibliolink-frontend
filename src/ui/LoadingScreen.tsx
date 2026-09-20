import { Logo } from './Logo'

export function LoadingScreen() {
  return (
    <div className="bg-linear-to-b from-mist-700 to-teal-950 grid flex-1 place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <Logo />
        <p className="font-serif text-lg text-stone-300">Cargando…</p>
      </div>
    </div>
  )
}
