import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

import { FormButton } from '../../../components/ui/FormButton'
import { useReserveSubscription } from '../hooks/useSubscribe'
import { subscribeErrorMessage } from '../lib/subscribeErrorMessage'

// Reserva la suscripción localmente (PENDING). Falta conectar la redirección a PayPal
// hasta que el backend entregue la URL de aprobación en la respuesta de reserve().
export function SubscribeButton() {
  const { t } = useTranslation()
  const reserveSubscription = useReserveSubscription()

  return (
    <FormButton
      loading={reserveSubscription.isPending}
      onClick={() => {
        reserveSubscription.mutate(undefined, {
          onError: (error) => toast.error(subscribeErrorMessage(error)),
        })
      }}
    >
      {t('subscriptions:actions.subscribe')}
    </FormButton>
  )
}
