import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'
import StatsOverview, { type StatItem } from '../components/StatsOverview'
import { useFavorites } from '../hooks/useFavorites'
import { calcularMargem, fetchProducts, getAllNiches, getAllOrigins } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual } from '../utils/format'
import type { Niche, Origin, Product } from '../types/product'

export type ProductsPreset = 'todos' | 'ondas-iniciais' | 'alta-margem' | 'favoritos'

const PRESET_INFO: Record<ProductsPreset, { titulo: string; subtitulo: string; vazio: string }> = {
  todos: {
    titulo: 'Todos os Produtos',
    subtitulo: 'Explore o catálogo completo de produtos com potencial viral.',
    vazio: 'Nenhum produto encontrado com esses filtros.',
  },
  'ondas-iniciais': {
    titulo: 'Ondas Iniciais',
    subtitulo: 'Produtos em fase inicial de crescimento, antes da saturação do mercado.',
    vazio: 'Nenhuma onda inicial encontrada com esses filtros.',
  },
  'alta-margem': {
    titulo: 'Alta Margem',
    subtitulo: 'Ordenado pela maior margem de lucro estimada entre custo e venda sugerida.',
    vazio: 'Nenhum produto de alta margem encontrado com esses filtros.',
  },
  favoritos: {
    titulo: 'Favoritos',
    subtitulo: 'Seus produtos salvos, disponíveis mesmo offline.',
    vazio: 'Você ainda não salvou nenhum produto. Toque na estrela de um produto para salvá-lo aqui.',
  },
}

const HIGH_MARGIN_THRESHOLD = 60

export default function ProductsPage({ preset }: { preset: ProductsPreset }) {
  const { favoritos } = useFavorites()
  const [produtos, setProdutos] = useState<Product[]>([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [nicho, setNicho] = useState<Niche | 'todos'>('todos')
  const [origem, setOrigem] = useState<Origin | 'todos'>('todos')

  const niches = useMemo(() => getAllNiches(), [])
  const origins = useMemo(() => getAllOrigins(), [])

  useEffect(() => {
    let ativo = true
    // oxlint-disable-next-line -- sincroniza com a fonte de dados assíncrona (mock hoje, API futura)
    setCarregando(true)
    fetchProducts({ busca, nicho, origem }).then((resultado) => {
      if (ativo) {
        setProdutos(resultado)
        setCarregando(false)
      }
    })
    return () => {
      ativo = false
    }
  }, [busca, nicho, origem])

  const produtosFiltrados = useMemo(() => {
    switch (preset) {
      case 'ondas-iniciais':
        return produtos.filter((p) => p.onda === 'onda-inicial')
      case 'alta-margem':
        return produtos
          .filter((p) => calcularMargem(p.custo, p.precoSugerido) >= HIGH_MARGIN_THRESHOLD)
          .sort((a, b) => calcularMargem(b.custo, b.precoSugerido) - calcularMargem(a.custo, a.precoSugerido))
      case 'favoritos':
        return produtos.filter((p) => favoritos.includes(p.id))
      default:
        return produtos
    }
  }, [produtos, preset, favoritos])

  const info = PRESET_INFO[preset]

  const stats: StatItem[] = useMemo(() => {
    if (produtosFiltrados.length === 0) {
      return [
        { label: 'Produtos', valor: '0', icone: '📦' },
        { label: 'Score médio', valor: '—', icone: '🔥' },
        { label: 'Margem média', valor: '—', icone: '💰' },
        { label: 'Favoritos', valor: `${favoritos.length}`, icone: '⭐' },
      ]
    }

    const scoreMedio = produtosFiltrados.reduce((acc, p) => acc + p.scoreViral, 0) / produtosFiltrados.length
    const margemMedia =
      produtosFiltrados.reduce((acc, p) => acc + calcularMargem(p.custo, p.precoSugerido), 0) /
      produtosFiltrados.length
    const tendenciaMedia = produtosFiltrados.reduce((acc, p) => acc + p.precoSugerido - p.custo, 0)

    return [
      { label: 'Produtos', valor: `${produtosFiltrados.length}`, icone: '📦' },
      { label: 'Score médio', valor: scoreMedio.toFixed(0), icone: '🔥', destaque: 'positivo' },
      { label: 'Margem média', valor: formatarPercentual(margemMedia, 0), icone: '💰', destaque: 'positivo' },
      { label: 'Lucro potencial', valor: formatarMoeda(tendenciaMedia), icone: '📈' },
    ]
  }, [produtosFiltrados, favoritos.length])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100 md:text-2xl">{info.titulo}</h1>
        <p className="mt-1 text-sm text-gray-500">{info.subtitulo}</p>
      </div>

      <StatsOverview stats={stats} />

      <FilterBar
        busca={busca}
        onBuscaChange={setBusca}
        nicho={nicho}
        onNichoChange={setNicho}
        origem={origem}
        onOrigemChange={setOrigem}
        niches={niches}
        origins={origins}
      />

      {carregando ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="card-surface rounded-2xl p-10 text-center text-sm text-gray-500">{info.vazio}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </div>
      )}
    </div>
  )
}
