import { PlanCard } from '../components/PlanCard'
import { SubscribeButton } from '../components/SubscribeButton'
import { useEntitlements } from '../hooks/useEntitlements'

const FREE_FEATURES = ['Acceso a la biblioteca', 'Favoritos limitados', 'Con anuncios']
const PRO_FEATURES = ['Acceso a la biblioteca', 'Favoritos ilimitados', 'Sin anuncios' ]

function formatPeriodEnd(currentPeriodEnd: string | null): string | null {
  if (!currentPeriodEnd) return null
  return new Date(currentPeriodEnd).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function SubscribePage() {
  const { entitlement, hasPremiumAccess } = useEntitlements()
  const isPending = entitlement.status === 'PENDING'
  const isProCurrent = hasPremiumAccess || isPending
  const periodEnd = formatPeriodEnd(entitlement.currentPeriodEnd)

  return (
    <div className="max-w-3xl">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">Planes de BiblioLink</h1>
        <p className="mt-2 text-stone-300">Elige cómo quieres leer.</p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <PlanCard name="Free" price="Gratis" features={FREE_FEATURES} isCurrent={!isProCurrent} />

        <PlanCard
          name="Pro"
          price="$5.00 USD / mes"
          features={PRO_FEATURES}
          isCurrent={isProCurrent}
          action={
            hasPremiumAccess ? (
              periodEnd && (
                <p className="text-sm text-stone-600">
                  {entitlement.status === 'CANCELED' ? `Activo hasta el ${periodEnd}` : `Se renueva el ${periodEnd}`}
                </p>
              )
            ) : isPending ? (
              <p className="text-sm text-stone-600">
                Tu pago fue registrado. La activación puede tardar unos minutos.
              </p>
            ) : (
              <div className="cursor-not-allowed">
                <div className="pointer-events-none opacity-60">
                  <SubscribeButton />
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  )
}
