// Ambos valores son públicos (los entrega el equipo de backend junto al plan mensual de BiblioLink Pro).
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
export const PAYPAL_PLAN_ID = import.meta.env.VITE_PAYPAL_PLAN_ID

let sdkPromise: Promise<PayPalSdk> | null = null

/** Carga el SDK de PayPal para suscripciones una sola vez. Falla si falta configuración o si un bloqueador lo impide. */
export function loadPayPalSdk(): Promise<PayPalSdk> {
  if (!CLIENT_ID || !PAYPAL_PLAN_ID) {
    return Promise.reject(new Error('Faltan VITE_PAYPAL_CLIENT_ID o VITE_PAYPAL_PLAN_ID en el .env'))
  }

  if (window.paypal) return Promise.resolve(window.paypal)

  sdkPromise ??= new Promise<PayPalSdk>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(CLIENT_ID)}&vault=true&intent=subscription&currency=USD`
    script.async = true
    script.onload = () => {
      if (window.paypal) resolve(window.paypal)
      else reject(new Error('SDK de PayPal no disponible'))
    }
    script.onerror = () => {
      sdkPromise = null
      script.remove()
      reject(new Error('No se pudo cargar el SDK de PayPal'))
    }
    document.head.appendChild(script)
  })

  return sdkPromise
}
