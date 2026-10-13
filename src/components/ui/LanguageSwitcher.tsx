import { useTranslation } from 'react-i18next'

import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <label className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      <span className="sr-only">{t('common:language.label')}</span>
      <select
        value={current}
        onChange={(event) => void i18n.changeLanguage(event.target.value as SupportedLanguage)}
        aria-label={t('common:language.label')}
        className="cursor-pointer rounded-md border border-yellow-600 bg-transparent px-2 py-1 text-sm font-semibold text-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
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
