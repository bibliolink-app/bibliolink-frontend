import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

import { useConfirmSubscription, useReserveSubscription } from '../hooks/useSubscribe'
import { subscribeErrorMessage } from '../lib/subscribeErrorMessage'

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
const PAYPAL_PLAN_ID = import.meta.env.VITE_PAYPAL_PLAN_ID

if (!PAYPAL_CLIENT_ID || !PAYPAL_PLAN_ID) {
  throw new Error('Configuración de entorno inválida: faltan las variables de PayPal.')
}

/**
 * Botón de suscripción de PayPal: reserva la suscripción localmente (PENDING), la crea en PayPal
 * con esa reserva como `custom_id`, y al aprobarla la vincula. Activarla de verdad depende del
 * webhook de PayPal que nos notifica que el pago fue exitoso.
 */
export function SubscribeButton() {
  const { t } = useTranslation()
  const reserveSubscription = useReserveSubscription()
  const confirmSubscription = useConfirmSubscription()
  const pendingSubscriptionId = useRef<number | null>(null)

  const reserveErrorShown = useRef(false)

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, vault: true, intent: 'subscription' }}>
      <PayPalButtons
        style={{ label: 'subscribe' }}
        disabled={confirmSubscription.isPending}
        createSubscription={async (_data, actions) => {
          reserveErrorShown.current = false

          let reservation
          try {
            reservation = await reserveSubscription.mutateAsync()
          } catch (error) {
            reserveErrorShown.current = true
            toast.error(subscribeErrorMessage(error))
            throw error
          }

          pendingSubscriptionId.current = reservation.subscriptionId

          return actions.subscription.create({
            plan_id: PAYPAL_PLAN_ID,
            custom_id: reservation.checkoutReference,
          })
        }}
        onApprove={async (data) => {
          if (pendingSubscriptionId.current === null || !data.subscriptionID) return

          await confirmSubscription.mutateAsync({
            subscriptionId: pendingSubscriptionId.current,
            externalSubscriptionReference: data.subscriptionID,
          })

          toast.success(t('subscriptions:toast.paymentRegistered'))
        }}
        onError={() => {
          if (reserveErrorShown.current) return
          toast.error(t('subscriptions:toast.genericError'))
        }}
      />
    </PayPalScriptProvider>
  )
}
