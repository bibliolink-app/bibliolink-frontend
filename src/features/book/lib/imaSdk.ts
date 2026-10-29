const IMA_SDK_URL = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'

// Etiqueta de prueba oficial de Google 
export const AD_TAG_URL =
  'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&correlator='

let sdkPromise: Promise<ImaSdk> | null = null

/** Carga ima3.js una sola vez. Falla si un bloqueador de anuncios impide la descarga. */
export function loadImaSdk(): Promise<ImaSdk> {
  if (window.google?.ima) return Promise.resolve(window.google.ima)

  sdkPromise ??= new Promise<ImaSdk>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = IMA_SDK_URL
    script.async = true
    script.onload = () => {
      const ima = window.google?.ima
      if (ima) resolve(ima)
      else reject(new Error('IMA SDK no disponible'))
    }
    script.onerror = () => {
      sdkPromise = null
      script.remove()
      reject(new Error('No se pudo cargar el IMA SDK'))
    }
    document.head.appendChild(script)
  })

  return sdkPromise
}
