import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { calcularMargem } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual } from '../utils/format'
import { useFavorites } from '../hooks/useFavorites'
import ScoreBadge from './ScoreBadge'

const ORIGEM_FLAG: Record<Product['origem'], string> = {
  China: '🇨🇳',
  Brasil: '🇧🇷',
  EUA: '🇺🇸',
  Europa: '🇪🇺',
}

const SATURACAO_COR: Record<Product['saturacaoBR'], string> = {
  Baixa: 'text-emerald-400',
  Média: 'text-amber-400',
  Alta: 'text-red-400',
}

export default function ProductCard({ product }: { product: Product }) {
  const { ehFavorito, alternarFavorito } = useFavorites()
  const margem = calcularMargem(product.custo, product.precoSugerido)
  const favorito = ehFavorito(product.id)

  return (
    <div className="card-surface group relative flex flex-col gap-3 overflow-hidden rounded-2xl border-l-2 border-l-brand-pink-500/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(254,44,85,0.15)]">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-pink-500/15 px-2.5 py-1 text-[10px] font-bold text-brand-pink-400 ring-1 ring-inset ring-brand-pink-500/30">
          ⚡ {product.tagCategoria}
        </span>
        <div className="flex items-center gap-1.5">
          <ScoreBadge score={product.scoreViral} />
          <button
            type="button"
            onClick={() => alternarFavorito(product.id)}
            aria-pressed={favorito}
            aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-sm hover:bg-white/10"
          >
            {favorito ? '⭐' : '☆'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
        <span>{ORIGEM_FLAG[product.origem]}</span>
        <span>{product.origem}</span>
        <span className="text-white/15">•</span>
        <span className="rounded-md bg-white/5 px-1.5 py-0.5">{product.nicho}</span>
      </div>

      <Link to={`/produto/${product.id}`} className="flex flex-col gap-0.5">
        <h3 className="text-sm font-bold leading-snug text-gray-100">{product.nome}</h3>
        <p className="line-clamp-1 text-[11px] italic text-gray-500">Origem: {product.termoBuscaInternacional}</p>
      </Link>

      <div className="flex items-center gap-1.5 text-[10px] font-semibold">
        <span className="rounded-md bg-brand-cyan-500/10 px-1.5 py-0.5 text-brand-cyan-400">✨ SOCIAL PROOF</span>
        <span className="text-gray-400">
          Trend Velocity: <span className="text-brand-pink-400">{product.trendVelocity}</span>
        </span>
        <span className="ml-auto text-gray-500">{product.buscas} buscas</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="rounded-lg bg-white/5 px-1 py-1.5">
          <p className="text-[10px] text-gray-500">Custo</p>
          <p className="text-xs font-semibold text-gray-200">{formatarMoeda(product.custo)}</p>
        </div>
        <div className="rounded-lg bg-white/5 px-1 py-1.5">
          <p className="text-[10px] text-gray-500">Venda</p>
          <p className="text-xs font-semibold text-gray-200">{formatarMoeda(product.precoSugerido)}</p>
        </div>
        <div className="rounded-lg bg-emerald-500/10 px-1 py-1.5">
          <p className="text-[10px] text-emerald-500">Margem</p>
          <p className="text-xs font-semibold text-emerald-400">{formatarPercentual(margem, 0)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
        <p className="text-[9px] font-bold uppercase tracking-wide text-gray-500">Por que vende muito no Brasil:</p>
        <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-gray-400">{product.entendimentoCultural}</p>
      </div>

      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span className="truncate">🌐 {product.origemTendencia}</span>
        <span className={`shrink-0 font-semibold ${SATURACAO_COR[product.saturacaoBR]}`}>
          Saturação BR: {product.saturacaoBR}
        </span>
      </div>

      <Link
        to={`/produto/${product.id}`}
        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-pink-900/30 hover:opacity-90"
      >
        Ver Raio-X Completo da Onda →
      </Link>

      <div className="flex gap-2">
        <Link
          to={`/produto/${product.id}#ganchos`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/10 py-1.5 text-[11px] font-semibold text-gray-300 hover:bg-white/5"
        >
          🎥 Criativos
        </Link>
        <Link
          to="/calculadora"
          state={{ custo: product.custo, precoVenda: product.precoSugerido }}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/10 py-1.5 text-[11px] font-semibold text-gray-300 hover:bg-white/5"
        >
          🧮 Calculadora
        </Link>
      </div>
    </div>
  )
}
