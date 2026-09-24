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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '')
const NETWORK_DELAY_MS = 150

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

function buildQuery(filters: ProductFilters) {
  const query = new URLSearchParams()
  if (filters.busca?.trim()) query.set('search', filters.busca.trim())
  if (filters.nicho && filters.nicho !== 'todos') query.set('nicho', filters.nicho)
  if (filters.origem && filters.origem !== 'todos') query.set('origem', filters.origem)
  if (filters.onda && filters.onda !== 'todos') query.set('onda', filters.onda)
  const encoded = query.toString()
  return encoded ? `?${encoded}` : ''
}

async function fetchApi<T>(path: string): Promise<T> {
  if (!API_BASE_URL) throw new Error('VITE_API_BASE_URL não configurada')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`API de produtos respondeu HTTP ${response.status}`)
  }
  return (await response.json()) as T
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  if (API_BASE_URL) {
    try {
      return await fetchApi<Product[]>(`/products${buildQuery(filters)}`)
    } catch (error) {
      console.warn('[Tikblox] API indisponível; usando catálogo offline.', error)
    }
  }

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
  if (API_BASE_URL) {
    try {
      return await fetchApi<Product>(`/products/${encodeURIComponent(id)}`)
    } catch (error) {
      console.warn('[Tikblox] API indisponível; usando produto offline.', error)
    }
  }
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
