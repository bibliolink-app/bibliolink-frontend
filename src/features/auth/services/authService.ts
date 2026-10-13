import { api } from '../../../api'
import type { LoginInput } from '../schemas/loginSchema'
import type { ForgotPasswordInput, ResetPasswordInput } from '../schemas/passwordRecoverySchema'
import type { RegisterInput } from '../schemas/registerSchema'
import type { AuthUser, MessageResponse } from '../types'

// Los endpoints públicos llevan `skipAuthRefresh`: no hay sesión que renovar y un 401 no significa "sesión caducada".
export const authService = {
  // Un 401 en el login significa "credenciales incorrectas", no "sesión caducada": no se renueva ni se reintenta.
  login: (input: LoginInput) =>
    api.post<MessageResponse>('/auth/login', input, { skipAuthRefresh: true }).then((response) => response.data),

  // Crea la cuenta pero no abre sesión: el backend responde solo con un mensaje.
  register: (input: RegisterInput) =>
    api.post<MessageResponse>('/auth/register', input, { skipAuthRefresh: true }).then((response) => response.data),

  logout: () => api.post<MessageResponse>('/auth/logout').then((response) => response.data),

  me: () => api.get<AuthUser>('/auth/me').then((response) => response.data),

  forgotPassword: (input: ForgotPasswordInput) =>
    api
      .post<MessageResponse>('/auth/forgot-password', input, { skipAuthRefresh: true })
      .then((response) => response.data),

  resetPassword: (input: ResetPasswordInput) =>
    api
      .post<MessageResponse>('/auth/reset-password', input, { skipAuthRefresh: true })
      .then((response) => response.data),
}
