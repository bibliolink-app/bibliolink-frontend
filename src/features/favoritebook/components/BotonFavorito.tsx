import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog'
import { useAgregarFavorito, useEsFavorito, useQuitarFavorito } from '../Hook/FavoritesHook'

interface BotonFavoritoProps {
  bookId: number
  titulo: string
  conTexto?: boolean
}

export function BotonFavorito({ bookId, titulo, conTexto = false }: BotonFavoritoProps) {
  const { t } = useTranslation()
  const { esFavorito } = useEsFavorito(bookId)
  const agregar = useAgregarFavorito()
  const quitar = useQuitarFavorito()

  const trabajando = agregar.isPending || quitar.isPending
  const etiqueta = esFavorito ? t('book:favoriteButton.remove') : t('book:favoriteButton.add')

  const clases = conTexto
    ? `inline-flex items-center gap-2 rounded-md border border-yellow-600 px-4 py-2.5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 motion-safe:transition-colors ${
        esFavorito ? 'bg-yellow-600 text-stone-900' : 'text-stone-300 hover:bg-yellow-600/10'
      }`
    : `grid size-8 place-items-center rounded-full bg-black/45 backdrop-blur-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 motion-safe:transition-opacity ${
        esFavorito
          ? 'text-yellow-500 opacity-100'
          : 'text-stone-200 opacity-0 group-hover:opacity-100'
      }`

  const contenido = (
    <>
      <Heart className={`${conTexto ? 'size-5' : 'size-4'} ${esFavorito ? 'fill-current' : ''}`} />
      {conTexto && etiqueta}
    </>
  )

  if (!esFavorito) {
    return (
      <button
        type="button"
        onClick={() => agregar.mutate(bookId)}
        disabled={trabajando}
        aria-label={conTexto ? undefined : etiqueta}
        title={conTexto ? undefined : etiqueta}
        className={clases}
      >
        {contenido}
      </button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={trabajando}
          aria-label={conTexto ? undefined : etiqueta}
          title={conTexto ? undefined : etiqueta}
          className={clases}
        >
          {contenido}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('book:favoriteButton.confirmTitle', { titulo })}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('book:favoriteButton.confirmDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => quitar.mutate(bookId)}>
            {t('book:favoriteButton.confirmAction')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}