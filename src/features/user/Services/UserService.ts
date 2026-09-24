import { api } from '../../../api'
import type {
  ActualizarUsuarioFormData,
  CrearAdminFormData,
  PerfilUsuario,
  RespuestaMensaje,
  UsuarioListado,
} from '../Models/UserModels'


export const getProfile = async (): Promise<PerfilUsuario> => {
  const response = await api.get('/users/profile')
  return response.data
}

/**  lista completa de usuarios ADMIN. */
export const getAllUsers = async (): Promise<UsuarioListado[]> => {
  const response = await api.get('/users')
  return response.data
}

/**  un usuario por su ID ADMIN. */
export const getUserById = async (userId: number): Promise<UsuarioListado> => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}

/**  crea una cuenta con rol ADMIN ADMIN. */
export const createAdmin = async (data: CrearAdminFormData): Promise<UsuarioListado> => {
  const response = await api.post('/users/admins', data)
  return response.data
}

/** actualiza los datos de un usuario ADMIN. */
export const updateUser = async (
  userId: number,
  data: ActualizarUsuarioFormData,
): Promise<RespuestaMensaje> => {
  const response = await api.patch(`/users/${userId}`, data)
  return response.data
}

/**  reactiva una cuenta.  */
export const enableUser = async (userId: number): Promise<RespuestaMensaje> => {
  const response = await api.patch(`/users/${userId}/enable`)
  return response.data
}

/**  desactiva una cuenta*/
export const disableUser = async (userId: number): Promise<RespuestaMensaje> => {
  const response = await api.patch(`/users/${userId}/disable`)
  return response.data
}