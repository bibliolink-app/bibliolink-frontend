// Clave de la query que guarda el estado local de la membresía. Vive fuera de `auth`
// porque es un dominio aparte (ver useEntitlements), igual que decide session.ts para la sesión.
export const membershipKeys = {
  membership: ['subscriptions', 'membership'] as const,
}
