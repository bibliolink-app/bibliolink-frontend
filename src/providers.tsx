import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { ApiError, setSessionExpiredHandler } from './api'
import { Toaster } from './components/ui/sonner'
import { useSession } from './features/auth/hooks/useSession'
import { endSession } from './features/auth/lib/session'
import { LoadingScreen } from './components/ui/LoadingScreen'
import i18n from './i18n'

const queryClient = new QueryClient()


i18n.on('languageChanged', () => {
  void queryClient.refetchQueries({
    predicate: (query) =>
      query.state.status === 'error' && !(query.state.error instanceof ApiError && query.state.error.status === 401),
  })
})

// Si la renovación de sesión falla, el cliente HTTP avisa aquí y la sesión local se cierra en un solo sitio.
// Los guards de rutas reaccionan solos y llevan al usuario a /login.
setSessionExpiredHandler(() => {
  endSession(queryClient)
})

/** Bloquea el render hasta saber si hay sesión, para no mostrar el login a alguien que ya la tiene. */
function SessionGate({ children }: { children: ReactNode }) {
  const { isPending } = useSession()

  return isPending ? <LoadingScreen /> : children
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionGate>{children}</SessionGate>
      {/* Arriba a la derecha: los avisos quedan a la vista aunque la página
          sea larga y el usuario esté leyendo abajo. */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
