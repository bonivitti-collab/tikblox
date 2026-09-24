import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { calcularMargem } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual, formatarVisualizacoes } from '../utils/format'
import { useFavorites } from '../hooks/useFavorites'
import ScoreBadge from './ScoreBadge'

const ONDA_LABEL: Record<Product['onda'], string> = {
  'onda-inicial': 'Onda Inicial',
  'em-alta': 'Em Alta',
  consolidado: 'Consolidado',
  saturado: 'Saturado',
}

export default function ProductCard({ product }: { product: Product }) {
  const { ehFavorito, alternarFavorito } = useFavorites()
  const margem = calcularMargem(product.custo, product.precoSugerido)
  const favorito = ehFavorito(product.id)

  return (
    <div className="card-surface group relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5">
      <Link to={`/produto/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
          <img
            src={product.imagem}
            alt={product.nome}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <ScoreBadge score={product.scoreViral} />
          </div>
          <div className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[11px] font-medium text-gray-200 backdrop-blur">
            {ONDA_LABEL[product.onda]}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{product.nicho}</span>
            <span>•</span>
            <span>{product.origem}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-100">{product.nome}</h3>
          <p className="line-clamp-2 text-xs text-gray-500">{product.descricaoCurta}</p>

          <div className="mt-1 grid grid-cols-3 gap-2 text-center">
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

          <p className="mt-1 text-[11px] text-gray-500">👁 {formatarVisualizacoes(product.visualizacoes)} visualizações</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => alternarFavorito(product.id)}
        aria-pressed={favorito}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-lg backdrop-blur transition-colors hover:bg-black/70"
      >
        {favorito ? '⭐' : '☆'}
      </button>
    </div>
  )
}
