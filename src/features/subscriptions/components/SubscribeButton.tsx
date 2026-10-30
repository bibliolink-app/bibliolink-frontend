import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import i18n from '@/i18n'
import { useConfirmSubscription, useReserveSubscription } from '../hooks/useSubscribe'
import { membershipKeys } from '../lib/membershipKeys'
import { PAYPAL_PLAN_ID, loadPayPalSdk } from '../lib/paypalSdk'
import { subscribeErrorMessage } from '../lib/subscribeErrorMessage'
import type { ReserveSubscriptionResponse } from '../types'

type EstadoBotones = 'loading' | 'ready' | 'error'

// Flujo: clic en PayPal -> reserva PENDING en el backend -> PayPal crea la suscripción con la
// `checkoutReference` como custom_id -> al aprobar se vincula con /confirm. Solo el webhook la activa.
export function SubscribeButton() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { mutateAsync: reservar } = useReserveSubscription()
  const { mutateAsync: confirmar } = useConfirmSubscription()
  const contenedor = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<EstadoBotones>('loading')

  useEffect(() => {
    const elemento = contenedor.current
    if (!elemento) return

    let cancelado = false
    let botones: PayPalButtonsInstance | undefined
    let reserva: ReserveSubscriptionResponse | null = null

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelado) return

        botones = paypal.Buttons({
          style: { layout: 'vertical', shape: 'rect', label: 'subscribe' },

          // La reserva se crea aquí y no al montar: así solo existe si el usuario abre PayPal.
          createSubscription: async (_data, actions) => {
            reserva = await reservar()
            return actions.subscription.create({
              plan_id: PAYPAL_PLAN_ID,
              custom_id: reserva.checkoutReference,
            })
          },

          onApprove: async (data) => {
            if (!reserva || !data.subscriptionID) {
              toast.error(i18n.t('subscriptions:toast.genericError'))
              return
            }

            try {
              await confirmar({
                subscriptionId: reserva.subscriptionId,
                externalSubscriptionReference: data.subscriptionID,
              })
              toast.success(i18n.t('subscriptions:toast.paymentRegistered'))
            } catch {
              // PayPal ya aprobó: el webhook vincula la suscripción aunque este paso falle.
              toast.warning(i18n.t('subscriptions:toast.confirmPending'))
            }

            void queryClient.invalidateQueries({ queryKey: membershipKeys.membership })
          },

          onError: (error) => toast.error(subscribeErrorMessage(error)),
        })

        return botones.render(elemento).then(() => {
          if (!cancelado) setEstado('ready')
        })
      })
      .catch(() => {
        if (!cancelado) setEstado('error')
      })

    return () => {
      cancelado = true
      botones?.close().catch(() => {})
    }
  }, [reservar, confirmar, queryClient])

  return (
    <div className="flex flex-col gap-2">
      <div ref={contenedor} className="isolate" />
      {estado === 'loading' && <p className="text-sm text-stone-400">{t('subscriptions:actions.loadingPayPal')}</p>}
      {estado === 'error' && <p className="text-sm text-red-400">{t('subscriptions:errors.paypalLoad')}</p>}
    </div>
  )
}
