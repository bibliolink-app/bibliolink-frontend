import type { IconName } from './icons'


export interface LandingCard {
  icon: IconName
  title: string
  description: string
}

export interface LandingCardSection {
  title: string
  description: string
  items: LandingCard[]
}

/** Un paso del proceso para llegar al catálogo. */
export interface LandingStep {
  icon: IconName
  title: string
  description: string
}