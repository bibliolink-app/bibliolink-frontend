import { Link } from 'react-router'
import { LogIn } from 'lucide-react'

import { PATHS } from '../../../router'
import { Logo } from '../../../ui/Logo'
import data from '../data.json'

/** Barra superior fija: marca a la izquierda, secciones al centro y el acceso al login a la derecha. */
export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-yellow-600/30 bg-teal-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo size="sm" />

        <nav aria-label="Secciones" className="hidden gap-6 md:flex">
          {data.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          to={PATHS.login}
          className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
        >
          <LogIn className="size-5" />
          {data.hero.loginLabel}
        </Link>
      </div>
    </header>
  )
}