
export type PeriodoRegistro = 'day' | 'week' | 'month'


export interface RegistroPorPeriodo {
  period: string
  users: number
}

export interface ResumenUsuarios {
  totalUsers: number
  premiumUsers: number
  freeUsers: number
}
