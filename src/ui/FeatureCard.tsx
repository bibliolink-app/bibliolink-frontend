import type { ReactNode } from 'react'
import { Clock } from 'lucide-react'

/** Marca de una sección cuya funcionalidad todavía no existe. Se quita de la tarjeta cuando se implemente. */
function PendingBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 ring-1 ring-stone-500/40">
      <Clock className="size-3.5" />
      Pendiente de implementar
    </span>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  pending?: boolean
}

/** Tarjeta de una sección del panel. Con `pending` indica que aún no está disponible. */
export function FeatureCard({ title, description, icon, pending = true }: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-md bg-stone-100 text-stone-600 ring-1 ring-stone-500/30">
          {icon}
        </span>
        {pending && <PendingBadge />}
      </div>

      <div>
        <h2 className="font-serif text-xl font-semibold text-stone-900">{title}</h2>
        <p className="mt-1.5 text-stone-600">{description}</p>
      </div>
    </article>
  )
}
