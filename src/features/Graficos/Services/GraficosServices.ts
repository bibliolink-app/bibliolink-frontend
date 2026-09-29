import { http } from '../../../api'
import type { PeriodoRegistro, RegistroPorPeriodo, ResumenUsuarios } from '../Models/GraficosModels'

export const getRegistrations = async (period: PeriodoRegistro): Promise<RegistroPorPeriodo[]> => {
  const response = await http.get('/analytics/registrations', { params: { period } })
  return response.data
}

export const getSummary = async (): Promise<ResumenUsuarios> => {
  const response = await http.get('/analytics/summary')
  return response.data
}
