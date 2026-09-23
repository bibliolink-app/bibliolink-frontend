import { useEffect, useRef, useState } from 'react'
import { CircleAlert } from 'lucide-react'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

interface TurnstileApi {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string
      language?: string
      callback: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

// El script se carga una sola vez aunque el componente se monte varias veces.
let scriptPromise: Promise<void> | null = null

function loadTurnstile(): Promise<void> {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar la verificación de seguridad.'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

interface TurnstileWidgetProps {
  /** Recibe el token al resolverse, o cadena vacía cuando caduca o falla. */
  onToken: (token: string) => void
  /**
   * Cambiar este número vuelve a montar el widget y pide un token nuevo.
   * Los tokens de Turnstile son de un solo uso: tras un envío fallido hace falta otro.
   */
  resetKey?: number
}

export function TurnstileWidget({ onToken, resetKey = 0 }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    // Sin clave no hay nada que renderizar; el aviso se calcula al pintar, no aquí.
    if (!SITE_KEY) return

    let widgetId: string | null = null
    let cancelled = false

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return

        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          language: 'es',
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      })
      .catch((error: Error) => {
        if (!cancelled) setLoadError(error.message)
      })

    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [onToken, resetKey])

  const error = SITE_KEY ? loadError : 'Falta configurar VITE_TURNSTILE_SITE_KEY en el archivo .env.'

  if (error) {
    return (
      <p className="flex items-start gap-1.5 text-sm font-medium text-rose-900">
        <CircleAlert className="mt-0.5 size-4 shrink-0" />
        <span>{error}</span>
      </p>
    )
  }

  return <div ref={containerRef} />
}
