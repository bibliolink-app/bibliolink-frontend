import { Shield } from 'lucide-react'

import { PATHS } from '../../../router'
import { TextLink } from '../../../ui/TextLink'

export function ForbiddenPage() {
  return (
    <section
      aria-labelledby="forbidden-title"
      className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-stone-300 p-8 text-center text-stone-900 shadow-xl ring-1 ring-black/25"
    >
      <span className="grid size-14 place-items-center rounded-full bg-stone-100 text-stone-600 ring-1 ring-stone-500/30">
        <Shield className="size-7" />
      </span>
      <h1 id="forbidden-title" className="font-serif text-2xl font-semibold text-stone-900">
        Acceso restringido
      </h1>
      <p className="text-stone-600">No tienes permisos para ver esta sección.</p>
      <TextLink to={PATHS.home}>Volver al inicio</TextLink>
    </section>
  )
}
