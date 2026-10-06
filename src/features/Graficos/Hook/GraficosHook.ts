import { useQuery } from '@tanstack/react-query'

import type { PeriodoRegistro } from '../Models/GraficosModels'
import { getRegistrations, getSummary } from '../Services/GraficosServices'


export const useRegistrations = (period: PeriodoRegistro) => {
  return useQuery({
    
    queryKey: ['analytics', 'registrations', period],
    queryFn: () => getRegistrations(period),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useSummary = () => {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: getSummary,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
