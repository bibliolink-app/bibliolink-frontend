import { Link } from 'react-router'
import type { LinkProps } from 'react-router'

/**
 * Enlace para superficies claras. Va siempre subrayado: el color por sí solo no debe ser lo único que lo distinga
 * del texto. Al pasar el ratón cambia a rose-900.
 */
export function TextLink(props: LinkProps) {
  return (
    <Link
      {...props}
      className="rounded-sm font-semibold text-yellow-800 underline decoration-yellow-600 decoration-2 underline-offset-4 hover:text-rose-900 hover:decoration-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 motion-safe:transition-colors"
    />
  )
}
