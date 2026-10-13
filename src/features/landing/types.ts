import type { IconName } from './icons'


/** Un paso del recorrido que hace el usuario dentro de Biblio Link. */
export interface LandingStep {
  icon: IconName
  title: string
  description: string
}

/** Una función incluida solo en el plan Premium. */
export interface LandingPremiumItem {
  icon: IconName
  title: string
}

export interface LandingPremium {
  title: string
  description: string
  /** Etiqueta que deja claro que estas funciones no están en el plan gratuito. */
  badge: string
  items: LandingPremiumItem[]
}
