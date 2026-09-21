import { http } from '../../../api'
import type { LoginInput } from '../schemas/loginSchema'
import type { RegisterInput } from '../schemas/registerSchema'
import type { AuthUser, MessageResponse } from '../types'

export const authService = {
  login: (input: LoginInput) =>
    http.post<MessageResponse>('/auth/login', input, { skipAuthRefresh: true }).then((response) => response.data),

  // Crea la cuenta pero no abre sesión: el backend responde solo con un mensaje.
  register: (input: RegisterInput) =>
    http.post<MessageResponse>('/auth/register', input, { skipAuthRefresh: true }).then((response) => response.data),

  logout: () => http.post<MessageResponse>('/auth/logout').then((response) => response.data),

  me: () => http.get<AuthUser>('/auth/me').then((response) => response.data),
}
