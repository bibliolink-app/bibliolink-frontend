import { useTranslation } from 'react-i18next'

import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n'

interface LanguageSwitcherProps {
  className?: string
  /** `claro` para fondos oscuros, `oscuro` para fondos claros. */
  tono?: 'claro' | 'oscuro'
}

export function LanguageSwitcher({ className = '', tono = 'claro' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  const colores =
    tono === 'claro'
      ? 'border-yellow-600 text-stone-300 focus-visible:outline-yellow-500'
      : 'border-teal-950/25 text-teal-950 hover:border-teal-950 focus-visible:outline-teal-950'

  return (
    <label className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      <span className="sr-only">{t('common:language.label')}</span>
      <select
        value={current}
        onChange={(event) => void i18n.changeLanguage(event.target.value as SupportedLanguage)}
        aria-label={t('common:language.label')}
        className={`cursor-pointer rounded-full bg-transparent px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors ${colores}`}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang} className="text-stone-900">
            {LANGUAGE_LABELS[lang]}
          </option>
        ))}
      </select>
    </label>
  )
}
