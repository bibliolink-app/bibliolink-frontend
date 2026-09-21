import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '../lib/session'
import type { RegisterInput } from '../schemas/registerSchema'
import { authService } from '../services/authService'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    // El registro no deja sesión iniciada, así que se encadena el login con las mismas
    // credenciales para que la persona entre directo a su panel.
    mutationFn: async (input: RegisterInput) => {
      await authService.register(input)
      await authService.login({ email: input.email, password: input.password })
      return authService.me()
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.session, user)
    },
  })
}
