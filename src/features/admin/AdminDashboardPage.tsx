import { Link } from 'react-router'
import { BookOpen, ChartColumn, CreditCard, UserCircle, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../router'
import { FeatureCard } from '../../components/ui/FeatureCard'

export function AdminDashboardPage() {
  const { t } = useTranslation()

  const SECTIONS = [
    {
      title: t('admin:dashboard.sections.profile.title'),
      description: t('admin:dashboard.sections.profile.description'),
      icon: <UserCircle className="size-6" />,
      to: PATHS.adminProfile,
    },
    {
      title: t('admin:dashboard.sections.users.title'),
      description: t('admin:dashboard.sections.users.description'),
      icon: <Users className="size-6" />,
      to: PATHS.adminUsers,
    },
    {
      title: t('admin:dashboard.sections.analytics.title'),
      description: t('admin:dashboard.sections.analytics.description'),
      icon: <ChartColumn className="size-6" />,
      to: PATHS.adminAnalytics,
    },
    {
      title: t('admin:dashboard.sections.catalog.title'),
      description: t('admin:dashboard.sections.catalog.description'),
      icon: <BookOpen className="size-6" />,
    },
    {
      title: t('admin:dashboard.sections.subscriptions.title'),
      description: t('admin:dashboard.sections.subscriptions.description'),
      icon: <CreditCard className="size-6" />,
    },
  ]

  return (
    <>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('admin:dashboard.title')}</h1>
        <p className="mt-2 text-stone-300">{t('admin:dashboard.subtitle')}</p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2">
        {SECTIONS.map(({ to, ...section }) => (
          <li key={section.title}>
            {to ? (
              <Link
                to={to}
                className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
              >
                <FeatureCard {...section} />
              </Link>
            ) : (
              <FeatureCard {...section} />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
