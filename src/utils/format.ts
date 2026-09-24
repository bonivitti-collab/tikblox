export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR')
}

export function formatarPercentual(valor: number, casasDecimais = 1): string {
  return `${valor.toFixed(casasDecimais)}%`
}

export function formatarVisualizacoes(valor: number): string {
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`
  if (valor >= 1_000) return `${(valor / 1_000).toFixed(1)}mil`
  return `${valor}`
}
