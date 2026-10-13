
export const CHART_COLORS = {
  serie: '#b45309',
  premium: '#b45309',
  gratuito: '#0d9488',
  eje: '#78716c',
  texto: '#57534e',
} as const

export const AXIS_TICK = { fill: CHART_COLORS.texto, fontSize: 12 } as const


export const AXIS_LINE = { stroke: CHART_COLORS.eje, strokeOpacity: 0.35 } as const

export const AXIS_LABEL_STYLE = {
  fill: CHART_COLORS.texto,
  fontSize: 12,
  textAnchor: 'middle',
} as const

export const TOOLTIP_CURSOR = { fill: CHART_COLORS.eje, fillOpacity: 0.07 } as const

export const GRID_STROKE_OPACITY = 0.18
