import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { calcularMargem } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual, formatarVisualizacoes } from '../utils/format'
import { useFavorites } from '../hooks/useFavorites'
import ScoreBadge from './ScoreBadge'
import Sparkline from './Sparkline'

const ONDA_LABEL: Record<Product['onda'], string> = {
  'onda-inicial': 'Onda Inicial',
  'em-alta': 'Em Alta',
  consolidado: 'Consolidado',
  saturado: 'Saturado',
}

const ONDA_COR: Record<Product['onda'], string> = {
  'onda-inicial': 'bg-brand-cyan-500/20 text-brand-cyan-400',
  'em-alta': 'bg-brand-pink-500/20 text-brand-pink-400',
  consolidado: 'bg-amber-500/20 text-amber-300',
  saturado: 'bg-gray-500/20 text-gray-400',
}

export default function ProductCard({ product }: { product: Product }) {
  const { ehFavorito, alternarFavorito } = useFavorites()
  const margem = calcularMargem(product.custo, product.precoSugerido)
  const favorito = ehFavorito(product.id)
  const tendenciaPositiva =
    product.tendenciaSemanal[product.tendenciaSemanal.length - 1] >= product.tendenciaSemanal[0]

  return (
    <div className="card-surface group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(254,44,85,0.2)]">
      <Link to={`/produto/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-black/20">
          <img
            src={product.imagem}
            alt={product.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
            <ScoreBadge score={product.scoreViral} />
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold backdrop-blur ${ONDA_COR[product.onda]}`}>
              {ONDA_LABEL[product.onda]}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-6">
            <p className="text-[11px] font-medium text-gray-200">
              👁 {formatarVisualizacoes(product.visualizacoes)}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3.5">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <span className="rounded-md bg-white/5 px-1.5 py-0.5">{product.nicho}</span>
            <span className="rounded-md bg-white/5 px-1.5 py-0.5">{product.origem}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-100">{product.nome}</h3>

          <div className="-mb-1 -mt-1">
            <Sparkline data={product.tendenciaSemanal} color={tendenciaPositiva ? '#22c55e' : '#ef4444'} />
          </div>

          <div className="mt-1 grid grid-cols-3 gap-1.5 text-center">
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
        </div>
      </Link>

      <button
        type="button"
        onClick={() => alternarFavorito(product.id)}
        aria-pressed={favorito}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-sm backdrop-blur transition-colors hover:bg-black/70"
      >
        {favorito ? '⭐' : '☆'}
      </button>
    </div>
  )
}
