import type { QueryClient } from '@tanstack/react-query'

// Clave de la query que guarda la sesión: el usuario actual, o `null` si es un visitante anónimo. */
export const authKeys = {
  session: ['auth', 'session'] as const,
}


 //Cierra la sesión en el cliente: descarta los datos del usuario anterior y marca la sesión como anónima.
 
export function endSession(queryClient: QueryClient): void {
  queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== authKeys.session[0] })
  queryClient.setQueryData(authKeys.session, null)
}
