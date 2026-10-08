import type { ReactNode } from 'react'
import { ChartColumn, TrendingUp } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import { useTranslation } from 'react-i18next'

import type { RegistroPorPeriodo } from '../Models/GraficosModels'
import {
  AXIS_LABEL_STYLE,
  AXIS_LINE,
  AXIS_TICK,
  CHART_COLORS,
  GRID_STROKE_OPACITY,
  TOOLTIP_CURSOR,
} from '../lib/chartColors'
import { formatMes, formatMesCorto, formatSemana, formatSemanaCorta } from '../lib/formatPeriod'


const FORMATOS = {
  month: { corto: formatMesCorto, largo: formatMes, Icon: ChartColumn },
  week: { corto: formatSemanaCorta, largo: formatSemana, Icon: TrendingUp },
} as const


interface PuntoGrafica extends RegistroPorPeriodo {
  etiquetaCorta: string
  etiquetaLarga: string
}


function ChartTooltip({ active, payload }: TooltipContentProps) {
  const { t } = useTranslation()

  if (!active || !payload?.length) return null

  const punto = payload[0].payload as PuntoGrafica

  return (
    <div className="rounded-lg bg-stone-900 px-3 py-2 text-xs text-stone-100 shadow-xl ring-1 ring-black/20">
      <p className="font-semibold">{punto.etiquetaLarga}</p>
      <p className="mt-0.5 text-stone-300">
        {t('graficos:charts.tooltipUsers', { count: punto.users })}
      </p>
    </div>
  )
}

interface RegistrationsChartProps {
  data: RegistroPorPeriodo[]
  period: 'month' | 'week'
  title: string
  description: string
  children?: ReactNode
}

export function RegistrationsChart({
  data,
  period,
  title,
  description,
  children,
}: RegistrationsChartProps) {
  const { t, i18n } = useTranslation()
  const { corto, largo, Icon } = FORMATOS[period]

  // Las etiquetas se calculan
  const puntos: PuntoGrafica[] = data.map((item) => ({
    ...item,
    etiquetaCorta: corto(item.period, i18n.language),
    etiquetaLarga: largo(item.period, i18n.language),
  }))

  return (
    // Cada gráfica es su propia tarjeta, a todo el ancho.
    <section className="rounded-2xl bg-stone-100 p-5 shadow-lg shadow-black/10 ring-1 ring-stone-500/15 sm:p-7">
      <header className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/25">
          <Icon className="size-5" />
        </span>

        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-stone-600">{description}</p>
        </div>
      </header>

      {data.length === 0 ? (
        <p className="mt-6 rounded-lg bg-stone-200/60 px-4 py-12 text-center text-stone-600">
          {t('graficos:charts.empty')}
        </p>
      ) : (
        <>
          
          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={puntos}
                margin={{ top: 8, right: 8, bottom: 4, left: 0 }}
                barCategoryGap="32%"
              >
          
                <CartesianGrid vertical={false} stroke={CHART_COLORS.eje} strokeOpacity={GRID_STROKE_OPACITY} />

                <XAxis
                  dataKey="etiquetaCorta"
                  tickLine={false}
                  axisLine={AXIS_LINE}
                  tick={AXIS_TICK}
                  // Separa las etiquetas del eje y evita que se peguen entre sí.
                  dy={10}
                  // En dos columnas hay menos ancho: Recharts salta etiquetas antes de que se pisen.
                  minTickGap={16}
                />

                <YAxis
                  allowDecimals={false}
                  domain={[0, 'dataMax']}
                  tickLine={false}
                  axisLine={false}
                  tick={AXIS_TICK}
                  width={58}
                  label={{
                    value: t('graficos:common.users'),
                    angle: -90,
                    position: 'insideLeft',
                    style: AXIS_LABEL_STYLE,
                  }}
                />


                <Tooltip content={ChartTooltip} cursor={TOOLTIP_CURSOR} />

                <Bar
                  dataKey="users"
                  name={t('graficos:charts.seriesName')}
                  fill={CHART_COLORS.serie}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={56}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {children}
        </>
      )}
    </section>
  )
}
