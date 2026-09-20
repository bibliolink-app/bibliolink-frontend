import { useId } from 'react'
import type { ReactNode } from 'react'

import { BookShelf } from './BookShelf'
import { Logo } from './Logo'

interface CenteredCardProps {
  title: string
  description?: ReactNode
  children: ReactNode
}

/** Pantalla de acceso: marca, tarjeta centrada tipo "ex libris" y estante decorativo. Base de login, registro y recuperación. */
export function CenteredCard({ title, description, children }: CenteredCardProps) {
  const titleId = useId()

  return (
    <div className="bg-linear-to-b from-mist-700 to-teal-950 flex flex-1 flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-10 sm:py-14">
        <Logo />

        <section
          aria-labelledby={titleId}
          className="relative w-full max-w-md rounded-lg bg-stone-300 p-6 text-stone-900 shadow-2xl ring-1 ring-black/25 before:pointer-events-none before:absolute before:inset-2 before:rounded-md before:border before:border-stone-500/30 sm:p-10"
        >
          <h1 id={titleId} className="font-serif text-3xl font-semibold text-stone-900">
            {title}
          </h1>
          {description && <p className="mt-2 text-stone-600">{description}</p>}
          <div className="mt-7">{children}</div>
        </section>
      </main>

      <BookShelf />
    </div>
  )
}
