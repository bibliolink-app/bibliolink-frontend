import axios, { isAxiosError } from 'axios'
import { z } from 'zod'

//Conexión con la API del backend: configuración, errores y cliente HTTP.
 
 

// ───────────────────────────── Configuración ─────────────────────────────

const envSchema = z.object({
  VITE_API_URL: z.url({ error: 'VITE_API_URL debe ser una URL válida.' }),
})

const envResult = envSchema.safeParse(import.meta.env)

if (!envResult.success) {
  throw new Error(`Configuración de entorno inválida:\n${z.prettifyError(envResult.error)}`)
}

const API_URL = envResult.data.VITE_API_URL

// ─────────────────────────────── Errores ────────────────────────────────

const UNEXPECTED_ERROR = 'Ha ocurrido un error inesperado.'
const NETWORK_ERROR = 'No se pudo conectar con el servidor.'


export class ApiError extends Error {
  /** Código HTTP. `0` cuando no hubo respuesta (red caída, timeout). */
  readonly status: number
  readonly messages: string[]

  constructor(status: number, messages: string[]) {
    super(messages[0] ?? UNEXPECTED_ERROR)
    this.name = 'ApiError'
    this.status = status
    this.messages = messages
  }
}

/** El filtro de excepciones del backend responde `{ message: string | string[], ... }`. */
function extractMessages(data: unknown): string[] {
  if (typeof data !== 'object' || data === null || !('message' in data)) return []

  const { message } = data
  if (typeof message === 'string') return [message]
  if (Array.isArray(message)) return message.filter((item): item is string => typeof item === 'string')
  return []
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (isAxiosError(error)) {
    if (!error.response) return new ApiError(0, [NETWORK_ERROR])
    return new ApiError(error.response.status, extractMessages(error.response.data))
  }

  return new ApiError(0, [])
}

// ────────────────────────────── Cliente HTTP ─────────────────────────────

declare module 'axios' {
  interface AxiosRequestConfig {
    /** No intentar renovar la sesión ante un 401. Lo usan login y refresh. */
    skipAuthRefresh?: boolean
    /** Interno: la request ya se reintentó tras renovar la sesión. */
    _retry?: boolean
  }
}

// Los tokens viajan en cookies httpOnly: no hay interceptor de request porque no hay nada que inyectar.
export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15_000,
})

let onSessionExpired: () => void = () => {}

export function setSessionExpiredHandler(handler: () => void): void {
  onSessionExpired = handler
}

let refreshing: Promise<boolean> | null = null

/**
 * Renueva la sesión. Comparte una única petición en vuelo entre todas las requests que fallen a la vez.
 * `true`: renovada. `false`: la sesión realmente caducó (401). Cualquier otro fallo (red, 5xx) se propaga
 * para no cerrar la sesión del usuario por un problema transitorio.
 */
function refreshSession(): Promise<boolean> {
  refreshing ??= http
    .post('/auth/refresh', undefined, { skipAuthRefresh: true })
    .then(
      () => true,
      (error: unknown) => {
        if (error instanceof ApiError && error.status === 401) return false
        throw error
      },
    )
    .finally(() => {
      refreshing = null
    })

  return refreshing
}

http.interceptors.response.use(undefined, async (error: unknown) => {
  try {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config &&
      !error.config.skipAuthRefresh &&
      !error.config._retry
    ) {
      error.config._retry = true

      if (await refreshSession()) return await http(error.config)
      onSessionExpired()
    }
  } catch (refreshOrRetryError) {
    throw toApiError(refreshOrRetryError)
  }

  throw toApiError(error)
})
