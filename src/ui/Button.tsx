import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Muestra un indicador de progreso y bloquea el botón mientras se procesa la acción. */
  loading?: boolean
}

/** Botón principal de los formularios*/
export function Button({ type = 'button', loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-yellow-600 px-5 py-3 font-serif text-lg font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800 enabled:cursor-pointer enabled:hover:bg-yellow-800 enabled:hover:text-stone-300 enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-safe:transition-colors"
    >
      {loading && <LoaderCircle className="size-5 motion-safe:animate-spin" />}
      {children}
    </button>
  )
}
