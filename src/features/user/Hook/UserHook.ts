import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ActualizarUsuarioFormData } from '../Models/UserModels'
import {
  createAdmin,
  disableUser,
  enableUser,
  getAllUsers,
  getProfile,
  getUserById,
  updateUser,
} from '../Services/UserService'


export const useProfile = () => {
  return useQuery({
    queryKey: ['users', 'profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}


export const useUsers = () => {
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}


export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['users', 'detail', userId],
    queryFn: () => getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: userId > 0, 
  })
}


export const useCreateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/** Actualiza los datos de un usuario. */
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: ActualizarUsuarioFormData }) =>
      updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/** Reactiva una cuenta. */
export const useEnableUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: enableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/** Desactiva una cuenta. */
export const useDisableUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: disableUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}