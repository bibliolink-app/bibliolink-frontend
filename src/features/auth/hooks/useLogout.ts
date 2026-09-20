import { useMutation, useQueryClient } from '@tanstack/react-query'

import { endSession } from '../lib/session'
import { authService } from '../services/authService'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    // Aunque la petición falle, el usuario pidió salir: la sesión local se cierra siempre.
    onSettled: () => {
      endSession(queryClient)
    },
  })
}
