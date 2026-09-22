import { Link, Outlet } from 'react-router'
import { CircleUser, LoaderCircle, LogOut } from 'lucide-react'

import { useLogout } from '../features/auth/hooks/useLogout'
import { useSession } from '../features/auth/hooks/useSession'
import { ROLE_LABELS } from '../features/auth/types'
import { Logo } from '../ui/Logo'
import { BottomNav } from '../ui/BottomNav'
import { PATHS } from '../router'
/** Marco de la zona autenticada: cabecera con la marca, el rol de la sesión y el cierre de sesión. */
export function AppLayout() {
  const { user, isAdmin } = useSession()
const logout = useLogout()

  return (
    <div className="bg-linear-to-b from-mist-700 to-teal-950 flex flex-1 flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-stone-300 focus:px-4 focus:py-2 focus:font-semibold focus:text-stone-900"
      >
        Saltar al contenido
      </a>

      <header className="border-b border-yellow-600/30 bg-teal-950/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo size="sm" />

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden rounded-full border border-yellow-600 px-3 py-1 text-sm font-semibold text-stone-300 sm:inline-block">
                {ROLE_LABELS[user.role]}
              </span>
            )}
             {/* El administrador entra a su perfil desde su propio panel. */}
            {!isAdmin && (
              <Link
                to={PATHS.profile}
                aria-label="Mi perfil"
                className="rounded-full text-stone-300 hover:text-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
              >
                <CircleUser className="size-8" />
              </Link>
            )}

            <button
              type="button"
              aria-label="Cerrar sesión"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              aria-busy={logout.isPending}
              className="inline-flex items-center justify-center gap-2.5 rounded-md border border-yellow-600 px-4 py-2 font-semibold text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 enabled:cursor-pointer enabled:hover:border-rose-900 enabled:hover:bg-rose-900 enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-safe:transition-colors"
            >
              {logout.isPending ? (
                <LoaderCircle className="size-4 motion-safe:animate-spin" />
              ) : (
                <LogOut className="size-4" />
              )}
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main id="contenido" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 outline-none sm:py-14">
        <Outlet />
      </main>
      {!isAdmin && <BottomNav />}
    </div>
  )
}
