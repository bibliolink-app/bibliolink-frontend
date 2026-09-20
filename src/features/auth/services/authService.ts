import { http } from '../../../api'
import type { LoginInput } from '../schemas/loginSchema'
import type { AuthUser, MessageResponse } from '../types'

export const authService = {
  login: (input: LoginInput) =>
    http.post<MessageResponse>('/auth/login', input, { skipAuthRefresh: true }).then((response) => response.data),

  logout: () => http.post<MessageResponse>('/auth/logout').then((response) => response.data),

  me: () => http.get<AuthUser>('/auth/me').then((response) => response.data),
}
