import { useEffect, useState } from 'react'
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

// Sin proveedor de anuncios real todavía: esta cuenta atrás simula "ver el anuncio"
// para completar el flujo (reto -> anuncio -> canje). Cuando haya un proveedor,
// solo cambia este cuerpo, no el resto del flujo (hooks, backend ya están listos).
const DURACION_ANUNCIO_SEGUNDOS = 10

interface AnuncioRecompensaModalProps {
  bookId: number
}

export function AnuncioRecompensaModal({ bookId }: AnuncioRecompensaModalProps) {
  const { t } = useTranslation()
  const [abierto, setAbierto] = useState(false)
  const [segundosRestantes, setSegundosRestantes] = useState(DURACION_ANUNCIO_SEGUNDOS)

  const challenge = useRewardChallenge()
  const redeem = useRedeemReward(bookId)

  useEffect(() => {
    if (!challenge.data || segundosRestantes <= 0) return

    const id = setTimeout(() => setSegundosRestantes((segundos) => segundos - 1), 1000)
    return () => clearTimeout(id)
  }, [challenge.data, segundosRestantes])

  useEffect(() => {
    if (!challenge.data || segundosRestantes > 0 || redeem.isPending || redeem.isSuccess) return

    redeem.mutate(challenge.data.token, {
      onSuccess: () => setAbierto(false),
    })
  }, [challenge.data, segundosRestantes, redeem])

  const manejarCambioAbierto = (siguiente: boolean) => {
    setAbierto(siguiente)
    challenge.reset()
    redeem.reset()

    if (siguiente) {
      setSegundosRestantes(DURACION_ANUNCIO_SEGUNDOS)
      challenge.mutate()
    }
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
              : segundosRestantes > 0
                ? t('book:reader.adModalCountdown', { seconds: segundosRestantes })
                : t('book:reader.adModalRedeeming')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
