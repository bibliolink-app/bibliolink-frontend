export type Membresia = 'FREE' | 'PREMIUM'

export interface EstadoLectura {
  progressPercent: number
  readingLocation: string | null
  lastReadAt: string | null
}

export interface AccesoLectura {
  membership: Membresia
  canRead: boolean
  requiresReward: boolean
  expiresAt: string | null
  serverTime: string
  readingState: EstadoLectura | null
}

export interface PaginaLectura {
  pageNumber: number
  contentType: 'HTML' | 'IMAGE'
  content: string
  hasNextPage: boolean
}

export interface ProgresoLectura {
  progressPercent: number
  readingLocation: string
}