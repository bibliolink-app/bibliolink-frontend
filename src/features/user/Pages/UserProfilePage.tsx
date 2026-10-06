import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../ui/LoadingScreen'
import { TextLink } from '../../../ui/TextLink'
import { useSession } from '../../auth/hooks/useSession'
import { useEntitlements } from '../../subscriptions/hooks/useEntitlements'
import { useProfile } from '../Hook/UserHook'
import { userErrorMessage } from '../lib/userErrorMessage'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold tracking-wide text-stone-600">{label}</dt>
      <dd className="mt-0.5 text-stone-900">{value}</dd>
    </div>
  )
}

/** Datos de la cuenta del usuario lector. */
export function UserProfilePage() {
  const { t } = useTranslation()
  const { data: profile, isPending, isError, error } = useProfile()
  const { user } = useSession()
  const { entitlement, hasPremiumAccess } = useEntitlements()

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

  return (
    <>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('user:profilePage.title')}</h1>
        <p className="mt-2 text-stone-300">{t('user:profilePage.subtitle')}</p>
      </header>

      <article className="rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl font-semibold">{fullName}</h2>
          {user && (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600 ring-1 ring-stone-500/40">
              {t(`common:role.${user.role}`)}
            </span>
          )}
        </div>

        <p className="mb-6 text-stone-600">@{profile.username}</p>

        <dl className="grid gap-5 sm:grid-cols-2">
          <Field label={t('user:profilePage.fields.email')} value={profile.email} />
          <Field label={t('user:profilePage.fields.birthDate')} value={profile.birthDate} />
          <Field label={t('user:profilePage.fields.firstName')} value={profile.firstName} />
          <Field label={t('user:profilePage.fields.middleName')} value={profile.middleName ?? '—'} />
          <Field label={t('user:profilePage.fields.firstSurname')} value={profile.firstSurname} />
          <Field label={t('user:profilePage.fields.secondSurname')} value={profile.secondSurname ?? '—'} />
        </dl>
      </article>

      <article className="mt-6 rounded-lg bg-stone-300 p-6 text-stone-900 shadow-xl ring-1 ring-black/25 sm:p-8">
        <h2 className="font-serif text-2xl font-semibold">{t('user:profilePage.plan.title')}</h2>

        {hasPremiumAccess ? (
          <p className="mt-2 text-stone-600">{t('user:profilePage.plan.pro')}</p>
        ) : entitlement.status === 'PENDING' ? (
          <p className="mt-2 text-stone-600">{t('user:profilePage.plan.pending')}</p>
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
