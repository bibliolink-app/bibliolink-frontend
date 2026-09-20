import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '../lib/session'
import type { LoginInput } from '../schemas/loginSchema'
import { authService } from '../services/authService'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    // El backend no devuelve el usuario al iniciar sesión: primero deja las cookies y luego se consulta /me.
    mutationFn: async (input: LoginInput) => {
      await authService.login(input)
      return authService.me()
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.session, user)
    },
  })
}
