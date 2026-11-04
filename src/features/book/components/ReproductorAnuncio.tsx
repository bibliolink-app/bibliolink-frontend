import { Play } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useImaRewardedAd } from '../Hook/useImaRewardedAd'

interface ReproductorAnuncioProps {
  alCompletar: () => void
}

export function ReproductorAnuncio({ alCompletar }: ReproductorAnuncioProps) {
  const { t } = useTranslation()
  const contenedor = useRef<HTMLDivElement>(null)
  const { estado, reproducir } = useImaRewardedAd(contenedor, alCompletar)

  return (
    <div className="flex flex-col gap-3">
      <div ref={contenedor} className="aspect-video w-full overflow-hidden rounded-md bg-black" />

      {estado === 'loading' && <p className="text-sm text-stone-400">{t('book:reader.adModalLoading')}</p>}
      {estado === 'error' && <p className="text-sm text-red-400">{t('book:reader.adModalError')}</p>}
      {estado === 'ready' && (
        <button
          type="button"
          onClick={reproducir}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-600 px-5 py-2.5 font-serif font-bold text-stone-900 hover:bg-yellow-800 hover:text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
        >
          <Play className="size-5" />
          {t('book:reader.adModalPlay')}
        </button>
      )}
    </div>
  )
}
