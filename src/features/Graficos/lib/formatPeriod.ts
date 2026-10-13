
function parsePeriod(period: string): Date {
  const [year, month, day] = period.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}


function diaYMes(fecha: Date, locale: string): string {
  return fecha.toLocaleDateString(locale, { day: 'numeric', month: 'short' })
}


function finDeSemana(lunes: Date): Date {
  const fin = new Date(lunes)
  fin.setDate(fin.getDate() + 6)
  return fin
}


export function formatMes(period: string, locale: string): string {
  const fecha = parsePeriod(period)

  return `${capitalizar(fecha.toLocaleDateString(locale, { month: 'long' }))} ${fecha.getFullYear()}`
}


export function formatMesCorto(period: string, locale: string): string {
  const fecha = parsePeriod(period)
  return `${capitalizar(fecha.toLocaleDateString(locale, { month: 'short' }))} ${fecha.getFullYear()}`
}

// ─── Semanas ───


export function formatSemana(period: string, locale: string): string {
  const inicio = parsePeriod(period)
  const fin = finDeSemana(inicio)
  return `${diaYMes(inicio, locale)} - ${diaYMes(fin, locale)} ${inicio.getFullYear()}`
}

export function formatSemanaCorta(period: string, locale: string): string {
  const inicio = parsePeriod(period)
  return `${diaYMes(inicio, locale)} - ${diaYMes(finDeSemana(inicio), locale)}`
}
