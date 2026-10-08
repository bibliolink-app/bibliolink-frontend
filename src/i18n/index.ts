import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import adminEn from './locales/en/admin.json'
import authEn from './locales/en/auth.json'
import commonEn from './locales/en/common.json'
import graficosEn from './locales/en/graficos.json'
import landingEn from './locales/en/landing.json'
import libraryEn from './locales/en/library.json'
import subscriptionsEn from './locales/en/subscriptions.json'
import userEn from './locales/en/user.json'

import adminEs from './locales/es/admin.json'
import authEs from './locales/es/auth.json'
import commonEs from './locales/es/common.json'
import graficosEs from './locales/es/graficos.json'
import landingEs from './locales/es/landing.json'
import libraryEs from './locales/es/library.json'
import subscriptionsEs from './locales/es/subscriptions.json'
import userEs from './locales/es/user.json'

import adminFr from './locales/fr/admin.json'
import authFr from './locales/fr/auth.json'
import commonFr from './locales/fr/common.json'
import graficosFr from './locales/fr/graficos.json'
import landingFr from './locales/fr/landing.json'
import libraryFr from './locales/fr/library.json'
import subscriptionsFr from './locales/fr/subscriptions.json'
import userFr from './locales/fr/user.json'

import adminPt from './locales/pt/admin.json'
import authPt from './locales/pt/auth.json'
import commonPt from './locales/pt/common.json'
import graficosPt from './locales/pt/graficos.json'
import landingPt from './locales/pt/landing.json'
import libraryPt from './locales/pt/library.json'
import subscriptionsPt from './locales/pt/subscriptions.json'
import userPt from './locales/pt/user.json'

export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt', 'fr'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
}

// Español es el idioma de referencia de toda la app: si falta una clave en otro idioma, se cae aquí.
export const defaultNS = 'common'

export const resources = {
  es: { common: commonEs, auth: authEs, landing: landingEs, library: libraryEs, subscriptions: subscriptionsEs, admin: adminEs, user: userEs, graficos: graficosEs },
  en: { common: commonEn, auth: authEn, landing: landingEn, library: libraryEn, subscriptions: subscriptionsEn, admin: adminEn, user: userEn, graficos: graficosEn },
  pt: { common: commonPt, auth: authPt, landing: landingPt, library: libraryPt, subscriptions: subscriptionsPt, admin: adminPt, user: userPt, graficos: graficosPt },
  fr: { common: commonFr, auth: authFr, landing: landingFr, library: libraryFr, subscriptions: subscriptionsFr, admin: adminFr, user: userFr, graficos: graficosFr },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'es',
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'bibliolink.lang',
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  })

export default i18n
