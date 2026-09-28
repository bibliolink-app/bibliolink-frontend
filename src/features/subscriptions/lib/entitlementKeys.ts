// Clave de la query que guarda el estado local de la suscripción. Vive fuera de `auth`
// porque es un dominio aparte (ver useEntitlements), igual que decide session.ts para la sesión.
export const entitlementKeys = {
  entitlement: ['subscriptions', 'entitlement'] as const,
}
