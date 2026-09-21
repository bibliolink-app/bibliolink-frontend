// ─── Valores que define el backend ───

export type RolUsuario = 'USER' | 'ADMIN'
export type EstadoUsuario = 'ACTIVE' | 'INACTIVE'

// ─── Respuestas del servidor ───

/** Refleja UserListItemResponseDto. Lo devuelven GET /users, GET /users/:userId y POST /users/admins. */
export interface UsuarioListado {
  userId: number               // ID único del usuario
  username: string             // Nombre de usuario, máx. 25 caracteres
  firstName: string            // Primer nombre
  middleName: string | null    // Segundo nombre (puede venir null)
  firstSurname: string         // Primer apellido
  secondSurname: string | null // Segundo apellido (puede venir null)
  birthDate: string            // Fecha de nacimiento, formato YYYY-MM-DD
  email: string                // Correo electrónico
  role: RolUsuario             // Rol asignado
  status: EstadoUsuario        // Estado de la cuenta
  createdAt: string            // Fecha de alta (ISO string, ej: "2026-09-19T17:09:55.000Z")
}

/** Refleja UserProfileResponseDto. Lo devuelve GET /users/profile. */
export interface PerfilUsuario {
  username: string             // Nombre de usuario
  firstName: string            // Primer nombre
  middleName: string | null    // Segundo nombre (puede venir null)
  firstSurname: string         // Primer apellido
  secondSurname: string | null // Segundo apellido (puede venir null)
  birthDate: string            // Fecha de nacimiento, formato YYYY-MM-DD
  email: string                // Correo electrónico
}

/** Lo que devuelven update, enable y disable. */
export interface RespuestaMensaje {
  message: string              // Mensaje de confirmación del backend
}

// ─── Datos que envía el frontend ───

/** Refleja CreateAdminDto. POST /users/admins. El backend siempre asigna el rol ADMIN. */
export interface CrearAdminFormData {
  username: string             // Máx. 25 caracteres
  firstName: string            // Máx. 50 caracteres
  middleName: string | null    // Opcional
  firstSurname: string         // Máx. 50 caracteres
  secondSurname: string | null // Opcional
  birthDate: string            
  email: string               
  password: string             
}


export interface ActualizarUsuarioFormData {
  username?: string
  firstName?: string
  middleName?: string | null
  firstSurname?: string
  secondSurname?: string | null
  birthDate?: string
  email?: string
}