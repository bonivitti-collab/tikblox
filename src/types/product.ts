// Tipos de domínio do Tikblox.
// Esta camada define os contratos que a UI consome, independentemente da
// origem dos dados (mock hoje, API real no futuro).

export type Niche =
  | 'Casa e Cozinha'
  | 'Beleza e Cuidados'
  | 'Pet'
  | 'Fitness'
  | 'Eletrônicos'
  | 'Moda e Acessórios'
  | 'Bebês e Infantil'
  | 'Automotivo'

export type Origin = 'China' | 'Brasil' | 'EUA' | 'Europa'

export type ProductWave = 'onda-inicial' | 'em-alta' | 'consolidado' | 'saturado'

export interface SupplierInfo {
  id: string
  nome: string
  origem: Origin
  precoUnitario: number
  prazoEntregaDias: [number, number]
  pedidoMinimo: number
  confiabilidade: number // 0-100
  link: string
}

export interface MarketDiagnosis {
  resumo: string
  pontosFortes: string[]
  riscos: string[]
  publicoAlvo: string
  sazonalidade: string
  concorrencia: 'Baixa' | 'Média' | 'Alta'
}

export interface ActionStep {
  titulo: string
  descricao: string
}

export interface Product {
  id: string
  nome: string
  descricaoCurta: string
  imagem: string
  nicho: Niche
  origem: Origin
  onda: ProductWave
  scoreViral: number // 0-100
  custo: number
  precoSugerido: number
  visualizacoes: number
  tendenciaSemanal: number[] // últimos 7 dias, valores relativos
  favoritoPadrao?: boolean
  diagnostico: MarketDiagnosis
  fornecedores: SupplierInfo[]
  planoDeAcao: ActionStep[]
  tags: string[]
}

export interface CalculatorInput {
  custoProduto: number
  frete: number
  taxaPlataformaPercentual: number
  taxaGatewayPercentual: number
  precoVenda: number
}

export interface CalculatorResult {
  custoTotal: number
  taxasTotais: number
  lucroLiquido: number
  margemPercentual: number
  roi: number
}
