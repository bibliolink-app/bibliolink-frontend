import type { ReactNode } from 'react'

interface StatTileProps {
  label: string
  value: number
  hint?: string
  icon: ReactNode
}


export function StatTile({ label, value, hint, icon }: StatTileProps) {
  return (
    <article className="flex items-start gap-4 rounded-xl bg-stone-100 p-5 shadow-sm ring-1 ring-stone-500/15 sm:p-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/25">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-stone-900">{label}</p>

       
        <p className="mt-1 font-serif text-4xl leading-none font-bold tabular-nums text-stone-900">
          {value.toLocaleString('es-CR')}
        </p>

        {hint && <p className="mt-2 text-sm text-stone-600">{hint}</p>}
      </div>
    </article>
  )
}
