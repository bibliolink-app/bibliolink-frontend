import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog'
import { useRedeemReward, useRewardChallenge } from '../Hook/ReadingHook'
import { readingErrorMessage } from '../lib/readingErrorMessage'
import { ReproductorAnuncio } from './ReproductorAnuncio'

// Flujo: reto (token) -> anuncio de Google IMA -> canje. El anuncio usa una etiqueta de prueba
// (ver AD_TAG_URL en lib/imaSdk.ts); con la cuenta de Ad Manager solo cambia esa etiqueta.

interface AnuncioRecompensaModalProps {
  bookId: number
}

export function AnuncioRecompensaModal({ bookId }: AnuncioRecompensaModalProps) {
  const { t } = useTranslation()
  const [abierto, setAbierto] = useState(false)

  const challenge = useRewardChallenge()
  const redeem = useRedeemReward(bookId)

  // El token ya existe cuando se muestra el reproductor; se canjea solo al terminar el anuncio.
  const canjear = () => {
    if (!challenge.data || redeem.isPending || redeem.isSuccess) return

    redeem.mutate(challenge.data.token, {
      onSuccess: () => setAbierto(false),
    })
  }

  const manejarCambioAbierto = (siguiente: boolean) => {
    setAbierto(siguiente)
    challenge.reset()
    redeem.reset()

    if (siguiente) challenge.mutate()
  }

  const error = challenge.error ?? redeem.error

  return (
    <AlertDialog open={abierto} onOpenChange={manejarCambioAbierto}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-5 py-2.5 font-serif font-bold tracking-wide text-stone-900 shadow-md shadow-black/25 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
        >
          <Megaphone className="size-5" />
          {t('book:reader.watchAd')}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('book:reader.adModalTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {error
              ? readingErrorMessage(error)
              : redeem.isPending
                ? t('book:reader.adModalRedeeming')
                : t('book:reader.adModalWatch')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {challenge.data && !redeem.error && <ReproductorAnuncio alCompletar={canjear} />}

        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
