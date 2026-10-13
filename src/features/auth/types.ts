
export type UserRole = 'USER' | 'ADMIN'

type UserStatus = 'ACTIVE' | 'INACTIVE'

/** Respuesta de `GET /auth/me`. */
export interface AuthUser {
  userId: number
  role: UserRole
  status: UserStatus
}

export interface MessageResponse {
  message: string
}
