import { NavLink } from 'react-router'
import { House, Library, Search } from 'lucide-react'

import { PATHS } from '../router'


export function BottomNav() {
 
  const sections = [
    { to: PATHS.home, label: 'Inicio', Icon: House },
    { to: PATHS.search, label: 'Buscar', Icon: Search },
    { to: PATHS.favorites, label: 'Favoritos', Icon: Library },
  ]

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-10 border-t border-yellow-600/30 bg-teal-950/95 backdrop-blur"
    >
      <ul className="mx-auto flex w-full max-w-6xl">
        {sections.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 text-xs font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors ${
                  isActive ? 'text-yellow-500' : 'text-stone-300 hover:text-yellow-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="size-6" strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
