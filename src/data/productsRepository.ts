// Camada de acesso a dados de produtos. Hoje consome o mock em memória,
// mas a API pública (funções exportadas) é o contrato que a UI usa —
// substitua a implementação interna por chamadas HTTP reais sem tocar nos
// componentes que a consomem.

import { MOCK_PRODUCTS } from './mockProducts'
import type { Niche, Origin, Product, ProductWave } from '../types/product'

export interface ProductFilters {
  busca?: string
  nicho?: Niche | 'todos'
  origem?: Origin | 'todos'
  onda?: ProductWave | 'todos'
}

// Simula latência de rede leve para deixar a UI preparada para chamadas
// assíncronas reais (loading states) desde já.
const NETWORK_DELAY_MS = 150

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const { busca, nicho, origem, onda } = filters
  const termo = busca?.trim().toLowerCase()

  const resultado = MOCK_PRODUCTS.filter((produto) => {
    const combinaBusca =
      !termo ||
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricaoCurta.toLowerCase().includes(termo) ||
      produto.tags.some((tag) => tag.toLowerCase().includes(termo))

    const combinaNicho = !nicho || nicho === 'todos' || produto.nicho === nicho
    const combinaOrigem = !origem || origem === 'todos' || produto.origem === origem
    const combinaOnda = !onda || onda === 'todos' || produto.onda === onda

    return combinaBusca && combinaNicho && combinaOrigem && combinaOnda
  })

  return delay(resultado)
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return delay(MOCK_PRODUCTS.find((produto) => produto.id === id))
}

export function getAllNiches(): Niche[] {
  return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.nicho))).sort()
}

export function getAllOrigins(): Origin[] {
  return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.origem))).sort()
}

export function calcularMargem(custo: number, precoVenda: number): number {
  if (precoVenda <= 0) return 0
  return ((precoVenda - custo) / precoVenda) * 100
}
