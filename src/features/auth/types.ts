
export type UserRole = 'USER' | 'ADMIN'

/** Nombre de cada rol tal como se muestra al usuario. */
export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Usuario',
  ADMIN: 'Administrador',
}

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
