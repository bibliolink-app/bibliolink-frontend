import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

import { AD_TAG_URL, loadImaSdk } from '../lib/imaSdk'

export type EstadoAnuncio = 'loading' | 'ready' | 'playing' | 'completed' | 'error'


 // Pide un anuncio con el IMA SDK
 
export function useImaRewardedAd(contenedor: RefObject<HTMLDivElement | null>, alCompletar: () => void) {
  const [estado, setEstado] = useState<EstadoAnuncio>('loading')
  const displayRef = useRef<ImaAdDisplayContainer | null>(null)
  const managerRef = useRef<ImaAdsManager | null>(null)
  const sdkRef = useRef<ImaSdk | null>(null)
  const alCompletarRef = useRef(alCompletar)

  useEffect(() => {
    alCompletarRef.current = alCompletar
  }, [alCompletar])

  useEffect(() => {
    const elemento = contenedor.current
    if (!elemento) return

    let cancelado = false
    let loader: ImaAdsLoader | undefined

    loadImaSdk()
      .then((ima) => {
        if (cancelado) return

        sdkRef.current = ima
        const display = new ima.AdDisplayContainer(elemento)
        displayRef.current = display

        loader = new ima.AdsLoader(display)
        loader.addEventListener(ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (event) => {
          const manager = event.getAdsManager({ currentTime: 0 })
          managerRef.current = manager

          manager.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, () => setEstado('error'))
          manager.addEventListener(ima.AdEvent.Type.COMPLETE, () => {
            setEstado('completed')
            alCompletarRef.current()
          })

          setEstado('ready')
        })
        loader.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, () => setEstado('error'))

        const solicitud = new ima.AdsRequest()
        solicitud.adTagUrl = `${AD_TAG_URL}${Date.now()}`
        solicitud.linearAdSlotWidth = elemento.clientWidth
        solicitud.linearAdSlotHeight = elemento.clientHeight
        loader.requestAds(solicitud)
      })
      .catch(() => {
        if (!cancelado) setEstado('error')
      })

    return () => {
      cancelado = true
      managerRef.current?.destroy()
      loader?.destroy()
      displayRef.current?.destroy()
      managerRef.current = null
      displayRef.current = null
    }
  }, [contenedor])

  /** Debe llamarse desde un clic: los navegadores bloquean el vídeo con sonido sin gesto del usuario. */
  const reproducir = () => {
    const elemento = contenedor.current
    const ima = sdkRef.current
    const manager = managerRef.current
    if (!elemento || !ima || !manager) return

    try {
      displayRef.current?.initialize()
      manager.init(elemento.clientWidth, elemento.clientHeight, ima.ViewMode.NORMAL)
      manager.start()
      setEstado('playing')
    } catch {
      setEstado('error')
    }
  }

  return { estado, reproducir }
}
