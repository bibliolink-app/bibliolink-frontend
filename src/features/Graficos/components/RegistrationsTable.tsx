import { ChevronRight, Table } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { RegistroPorPeriodo } from '../Models/GraficosModels'
import { formatMes, formatSemana } from '../lib/formatPeriod'

interface RegistrationsTableProps {
  data: RegistroPorPeriodo[]
  period: 'month' | 'week'
}

export function RegistrationsTable({ data, period }: RegistrationsTableProps) {
  const { t, i18n } = useTranslation()

  if (data.length === 0) return null

  const esMes = period === 'month'
  const formato = esMes ? formatMes : formatSemana

  return (
    <details className="group mt-3 overflow-hidden rounded-lg bg-stone-200/50">

      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 text-sm font-semibold text-stone-900 hover:bg-stone-200 motion-safe:transition-colors [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 text-stone-600 group-open:rotate-90 motion-safe:transition-transform" />
        <Table className="size-4 text-stone-600" />
        {t('graficos:table.toggle')}
      </summary>

      <div className="overflow-x-auto border-t border-stone-500/15 bg-stone-100">
        <table className="w-full text-left text-sm text-stone-900">
          <thead className="border-b border-stone-500/15">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                {esMes ? t('graficos:table.month') : t('graficos:table.week')}
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                {t('graficos:common.users')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.period} className="border-b border-stone-500/10 last:border-0">
                <td className="px-4 py-2.5">{formato(item.period, i18n.language)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{item.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}
