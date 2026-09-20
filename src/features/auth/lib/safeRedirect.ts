import { PATHS } from '../../../router'


 //Devuelve el destino al que volver tras iniciar sesión 
 
export function getSafeRedirect(state: unknown, fallback: string = PATHS.home): string {
  if (typeof state !== 'object' || state === null || !('from' in state) || typeof state.from !== 'string') {
    return fallback
  }

  try {
    const url = new URL(state.from, window.location.origin)
    if (url.origin !== window.location.origin || url.pathname === PATHS.login) return fallback
    return url.pathname + url.search + url.hash
  } catch {
    return fallback
  }
}
