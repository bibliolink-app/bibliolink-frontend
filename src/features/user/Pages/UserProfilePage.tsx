import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../components/ui/LoadingScreen'
import { TextLink } from '../../../components/ui/TextLink'
import { useEntitlements } from '../../subscriptions/hooks/useEntitlements'
import { useProfile } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-stone-100 px-4 py-3">
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="mt-1 break-words text-stone-900">{value}</dd>
    </div>
  )
}

/** Datos de la cuenta del usuario lector. */
export function UserProfilePage() {
  const { t } = useTranslation()
  const { data: profile, isPending, isError, error } = useProfile()
  const { hasPremiumAccess } = useEntitlements()

  if (isPending) return <LoadingScreen />

  if (isError) {
    return (
      <div
        role="alert"
        className="flex items-start gap-2.5 rounded-md border border-rose-300 bg-rose-100 px-3.5 py-3 text-rose-900"
      >
        <CircleAlert className="mt-0.5 size-5 shrink-0" />
        <p>{userErrorMessage(error)}</p>
      </div>
    )
  }

  const fullName = [profile.firstName, profile.middleName, profile.firstSurname, profile.secondSurname]
    .filter(Boolean)
    .join(' ')

  // Iniciales para el avatar: la del nombre y la del primer apellido.
  const iniciales = `${profile.firstName.charAt(0)}${profile.firstSurname.charAt(0)}`.toUpperCase()

  return (
    <>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('user:profilePage.title')}</h1>
        <p className="mt-2 text-stone-300">{t('user:profilePage.subtitle')}</p>
      </header>

      <article className="rounded-2xl bg-stone-200 p-6 text-stone-900 shadow-xl ring-1 ring-black/15 sm:p-8">
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-full bg-teal-900 font-serif text-xl font-bold text-stone-100"
          >
            {iniciales}
          </span>

          <div className="min-w-0">
            <h2 className="font-serif text-2xl font-semibold">{fullName}</h2>
            <p className="mt-0.5 text-stone-500">@{profile.username}</p>

            {/* Verde para el plan gratuito, dorado para Pro: el dorado es el color de marca de lo premium. */}
            <span
              className={`mt-2.5 inline-block rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                hasPremiumAccess
                  ? 'bg-yellow-100 text-yellow-900 ring-yellow-700/30'
                  : 'bg-emerald-100 text-emerald-900 ring-emerald-700/30'
              }`}
            >
              {hasPremiumAccess
                ? t('user:profilePage.plan.badgePro')
                : t('user:profilePage.plan.badgeFree')}
            </span>
          </div>
        </div>

        <h3 className="mt-8 font-serif text-lg font-semibold">
          {t('user:profilePage.personalInfo')}
        </h3>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label={t('user:profilePage.fields.email')} value={profile.email} />
          <Field label={t('user:profilePage.fields.birthDate')} value={profile.birthDate} />
          <Field label={t('user:profilePage.fields.firstName')} value={profile.firstName} />
          <Field label={t('user:profilePage.fields.middleName')} value={profile.middleName ?? '—'} />
          <Field label={t('user:profilePage.fields.firstSurname')} value={profile.firstSurname} />
          <Field label={t('user:profilePage.fields.secondSurname')} value={profile.secondSurname ?? '—'} />
        </dl>
      </article>

      <article className="mt-6 rounded-2xl bg-stone-200 p-6 text-stone-900 shadow-xl ring-1 ring-black/15 sm:p-8">
        <h2 className="font-serif text-2xl font-semibold">{t('user:profilePage.plan.title')}</h2>

        {hasPremiumAccess ? (
          <p className="mt-2 text-stone-600">{t('user:profilePage.plan.pro')}</p>
        ) : (
          <p className="mt-2 text-stone-600">
            {t('user:profilePage.plan.freeLead')}{' '}
            <TextLink to={PATHS.subscribe}>{t('user:profilePage.plan.upgradeCta')}</TextLink>{' '}
            {t('user:profilePage.plan.freeTrailing')}
          </p>
        )}
      </article>
    </>
  )
}
