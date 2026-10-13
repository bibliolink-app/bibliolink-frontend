import { useMutation } from '@tanstack/react-query'

import { authService } from '../services/authService'

// Los dos pasos de recuperar la contraseña: pedir el enlace por correo y establecer la nueva contraseña.

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
  })
}
