import { ChartColumn } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'

import type { ResumenUsuarios } from '../Models/GraficosModels'
import {
  AXIS_LABEL_STYLE,
  AXIS_LINE,
  AXIS_TICK,
  CHART_COLORS,
  GRID_STROKE_OPACITY,
  TOOLTIP_CURSOR,
} from '../lib/chartColors'

interface BarraTipo {
  tipo: string
  users: number
  color: string
}


function ChartTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null

  const punto = payload[0].payload as BarraTipo

  return (
    <div className="rounded-lg bg-stone-900 px-3 py-2 text-xs text-stone-100 shadow-xl ring-1 ring-black/20">
      <p className="font-semibold">{punto.tipo}</p>
      <p className="mt-0.5 text-stone-300">
        {punto.users} {punto.users === 1 ? 'usuario' : 'usuarios'}
      </p>
    </div>
  )
}


export function PremiumChart({ data }: { data: ResumenUsuarios }) {
  const barras: BarraTipo[] = [
    { tipo: 'Premium', users: data.premiumUsers, color: CHART_COLORS.premium },
    { tipo: 'Gratuitos', users: data.freeUsers, color: CHART_COLORS.gratuito },
  ]

  return (
    <section className="rounded-2xl bg-stone-100 p-5 shadow-lg shadow-black/10 ring-1 ring-stone-500/15 sm:p-7">
      <header className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-yellow-600/15 text-yellow-800 ring-1 ring-yellow-600/25">
          <ChartColumn className="size-5" />
        </span>

        <div className="min-w-0">
          <h2 className="font-serif text-xl font-semibold text-stone-900 sm:text-2xl">
            Distribución de usuarios
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Comparación entre cuentas Premium y cuentas gratuitas.
          </p>
        </div>
      </header>

      <div className="mt-6 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barras}
            margin={{ top: 8, right: 8, bottom: 4, left: 0 }}
            barCategoryGap="35%"
          >
           
            <CartesianGrid vertical={false} stroke={CHART_COLORS.eje} strokeOpacity={GRID_STROKE_OPACITY} />

            <XAxis
              dataKey="tipo"
              tickLine={false}
              axisLine={AXIS_LINE}
              tick={AXIS_TICK}
              dy={10}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, 'dataMax']}
              tickLine={false}
              axisLine={false}
              tick={AXIS_TICK}
              width={58}
              label={{
                value: 'Usuarios',
                angle: -90,
                position: 'insideLeft',
                style: AXIS_LABEL_STYLE,
              }}
            />

          
            <Tooltip content={ChartTooltip} cursor={TOOLTIP_CURSOR} />

            <Bar dataKey="users" radius={[6, 6, 0, 0]} maxBarSize={96}>
             
              {barras.map((barra) => (
                <Cell key={barra.tipo} fill={barra.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

   
    </section>
  )
}
