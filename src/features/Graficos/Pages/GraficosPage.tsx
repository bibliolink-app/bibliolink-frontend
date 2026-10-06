import { Link } from 'react-router'
import { ArrowLeft, ChevronRight, CircleAlert, Crown, Users } from 'lucide-react'

import { PATHS } from '../../../router'
import { LoadingScreen } from '../../../ui/LoadingScreen'
import { RegistrationsChart } from '../components/RegistrationsChart'
import { RegistrationsTable } from '../components/RegistrationsTable'
import { StatTile } from '../components/CardTotalUsuarios'
import { useRegistrations } from '../Hook/GraficosHook'
import { analyticsErrorMessage } from '../lib/AnalyticsErrorMessage'

export function GraficosPage() {

  const porMes = useRegistrations('month')
  const porSemana = useRegistrations('week')

  const isPending = porMes.isPending || porSemana.isPending
  const isError = porMes.isError || porSemana.isError
  const error = porMes.error ?? porSemana.error

 
  const total = (porMes.data ?? []).reduce((suma, item) => suma + item.users, 0)

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to={PATHS.admin}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-300 hover:text-yellow-500 motion-safe:transition-colors"
      >
        <ArrowLeft className="size-4" />
        Volver al panel
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <header className="max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
            Usuarios registrados
          </h1>
          <p className="mt-2.5 text-stone-300">
            Visualiza el crecimiento de los usuarios registrados en el sistema.
          </p>
          <p className="text-stone-300">No se incluyen administradores.</p>
        </header>

        <Link
          to={PATHS.adminAnalyticsPremium}
          className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2.5 font-semibold text-stone-900 shadow-md shadow-black/20 hover:bg-rose-900 hover:text-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-safe:transition-colors"
        >
          <Crown className="size-5" />
          Usuarios Premium
          <ChevronRight className="size-4" />
        </Link>
      </div>

      {isPending && <LoadingScreen />}

      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-100 px-4 py-3.5 text-rose-900"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>{analyticsErrorMessage(error)}</p>
        </div>
      )}

      {!isPending && !isError && (
        // `space-y-8` separa los bloques: cada tarjeta respira sin márgenes sueltos.
        <div className="space-y-8">
          <div className="max-w-md">
            <StatTile
              label="Total de usuarios registrados"
              value={total}
              hint="No incluye administradores"
              icon={<Users className="size-6" />}
            />
          </div>

          {/* Una tarjeta por gráfica, apiladas a todo el ancho. */}
          <RegistrationsChart
            data={porMes.data}
            period="month"
            title="Usuarios registrados por mes"
            description="Cantidad de nuevos usuarios registrados en cada mes."
          >
            <RegistrationsTable data={porMes.data} period="month" />
          </RegistrationsChart>

          <RegistrationsChart
            data={porSemana.data}
            period="week"
            title="Usuarios registrados por semana"
            description="Cantidad de nuevos usuarios registrados en cada semana."
          >
            <RegistrationsTable data={porSemana.data} period="week" />
          </RegistrationsChart>
        </div>
      )}
    </div>
  )
}
