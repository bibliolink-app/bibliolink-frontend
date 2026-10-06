import type { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

/** icono. */
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 hover:-translate-y-1 hover:shadow-2xl motion-safe:transition-all">
      <span className="grid size-12 place-items-center rounded-md bg-stone-100 text-stone-600 ring-1 ring-stone-500/30">
        {icon}
      </span>

      <div>
        <h2 className="font-serif text-xl font-semibold text-stone-900">{title}</h2>
        <p className="mt-1.5 text-stone-600">{description}</p>
      </div>
    </article>
  )
}
