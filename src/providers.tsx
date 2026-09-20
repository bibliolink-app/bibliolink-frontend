import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { setSessionExpiredHandler } from './api'
import { useSession } from './features/auth/hooks/useSession'
import { endSession } from './features/auth/lib/session'
import { LoadingScreen } from './ui/LoadingScreen'

const queryClient = new QueryClient()

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
    </QueryClientProvider>
  )
}
