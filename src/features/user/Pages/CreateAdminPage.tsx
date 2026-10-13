import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PATHS } from '../../../router'
import { CreateAdminForm } from '../components/CreateAdminForm'

export function CreateAdminPage() {
  const { t } = useTranslation()

  return (
    <>
      <Link
        to={PATHS.adminUsers}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500"
      >
        <ArrowLeft className="size-4" />
        {t('admin:createAdminPage.backToList')}
      </Link>

      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold text-stone-300 sm:text-4xl">{t('admin:createAdminPage.title')}</h1>
        <p className="mt-2 text-stone-300">
          {t('admin:createAdminPage.subtitle')}
        </p>
      </header>

      <div className="max-w-3xl rounded-lg bg-stone-300 p-6 shadow-xl ring-1 ring-black/25 sm:p-8">
        <CreateAdminForm />
      </div>
    </>
  )
}