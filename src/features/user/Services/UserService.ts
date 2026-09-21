import { http } from '../../../api'
import type {
  ActualizarUsuarioFormData,
  CrearAdminFormData,
  PerfilUsuario,
  RespuestaMensaje,
  UsuarioListado,
} from '../Models/UserModels'

/** GET /users/profile — perfil propio. Único endpoint de /users abierto a cualquier rol. */
export const getProfile = async (): Promise<PerfilUsuario> => {
  const response = await http.get('/users/profile')
  return response.data
}

/** GET /users — lista completa de usuarios. Solo ADMIN. */
export const getAllUsers = async (): Promise<UsuarioListado[]> => {
  const response = await http.get('/users')
  return response.data
}

/** GET /users/:userId — un usuario por su ID. Solo ADMIN. */
export const getUserById = async (userId: number): Promise<UsuarioListado> => {
  const response = await http.get(`/users/${userId}`)
  return response.data
}

/** POST /users/admins — crea una cuenta con rol ADMIN. Solo ADMIN. */
export const createAdmin = async (data: CrearAdminFormData): Promise<UsuarioListado> => {
  const response = await http.post('/users/admins', data)
  return response.data
}

/** PATCH /users/:userId — actualiza los datos de un usuario. Solo ADMIN. */
export const updateUser = async (
  userId: number,
  data: ActualizarUsuarioFormData,
): Promise<RespuestaMensaje> => {
  const response = await http.patch(`/users/${userId}`, data)
  return response.data
}

/** PATCH /users/:userId/enable — reactiva una cuenta. Solo ADMIN. Sin cuerpo. */
export const enableUser = async (userId: number): Promise<RespuestaMensaje> => {
  const response = await http.patch(`/users/${userId}/enable`)
  return response.data
}

/** PATCH /users/:userId/disable — desactiva una cuenta. Solo ADMIN. Sin cuerpo. */
export const disableUser = async (userId: number): Promise<RespuestaMensaje> => {
  const response = await http.patch(`/users/${userId}/disable`)
  return response.data
}