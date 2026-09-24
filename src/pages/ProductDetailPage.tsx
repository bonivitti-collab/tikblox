import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { calcularMargem, fetchProductById } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual, formatarVisualizacoes } from '../utils/format'
import { useFavorites } from '../hooks/useFavorites'
import ScoreBadge from '../components/ScoreBadge'
import type { Product } from '../types/product'

const CONCORRENCIA_COR: Record<string, string> = {
  Baixa: 'text-emerald-400',
  Média: 'text-amber-400',
  Alta: 'text-red-400',
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ehFavorito, alternarFavorito } = useFavorites()
  const [produto, setProduto] = useState<Product | null | undefined>(undefined)
  const [linkCopiado, setLinkCopiado] = useState(false)

  useEffect(() => {
    if (!id) return
    let ativo = true
    fetchProductById(id).then((resultado) => {
      if (ativo) setProduto(resultado ?? null)
    })
    return () => {
      ativo = false
    }
  }, [id])

  async function compartilhar() {
    if (!produto) return
    const url = window.location.href
    const dadosCompartilhamento = {
      title: produto.nome,
      text: `Confira este produto no Tikblox: ${produto.nome}`,
      url,
    }

    if (navigator.share) {
      try {
        await navigator.share(dadosCompartilhamento)
        return
      } catch {
        // usuário cancelou ou o compartilhamento falhou — cai para o fallback de cópia
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setLinkCopiado(true)
      setTimeout(() => setLinkCopiado(false), 2000)
    } catch {
      // clipboard indisponível — sem ação adicional
    }
  }

  if (produto === undefined) {
    return <div className="animate-pulse text-sm text-gray-500">Carregando produto...</div>
  }

  if (produto === null) {
    return (
      <div className="card-surface rounded-2xl p-10 text-center">
        <p className="mb-4 text-sm text-gray-400">Produto não encontrado.</p>
        <Link to="/" className="text-sm font-medium text-brand-pink-400 hover:underline">
          Voltar para Todos os Produtos
        </Link>
      </div>
    )
  }

  const margem = calcularMargem(produto.custo, produto.precoSugerido)
  const favorito = ehFavorito(produto.id)

  return (
    <div className="flex flex-col gap-6 pb-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="w-fit text-sm font-medium text-gray-500 hover:text-gray-200"
      >
        ← Voltar
      </button>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-black/20">
          <img src={produto.imagem} alt={produto.nome} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3">
            <ScoreBadge score={produto.scoreViral} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
              <span>{produto.nicho}</span>
              <span>•</span>
              <span>{produto.origem}</span>
              <span>•</span>
              <span>👁 {formatarVisualizacoes(produto.visualizacoes)}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-100 md:text-2xl">{produto.nome}</h1>
            <p className="mt-2 text-sm text-gray-400">{produto.descricaoCurta}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="card-surface rounded-xl p-3 text-center">
              <p className="text-[11px] text-gray-500">Custo</p>
              <p className="text-sm font-bold text-gray-100">{formatarMoeda(produto.custo)}</p>
            </div>
            <div className="card-surface rounded-xl p-3 text-center">
              <p className="text-[11px] text-gray-500">Venda sugerida</p>
              <p className="text-sm font-bold text-gray-100">{formatarMoeda(produto.precoSugerido)}</p>
            </div>
            <div className="card-surface rounded-xl p-3 text-center">
              <p className="text-[11px] text-emerald-500">Margem</p>
              <p className="text-sm font-bold text-emerald-400">{formatarPercentual(margem, 0)}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => alternarFavorito(produto.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                favorito
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                  : 'border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
              }`}
            >
              {favorito ? '⭐ Favoritado' : '☆ Favoritar'}
            </button>
            <button
              type="button"
              onClick={compartilhar}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-cyan-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              {linkCopiado ? '✅ Link copiado' : '🔗 Compartilhar'}
            </button>
          </div>

          <Link
            to="/calculadora"
            state={{ custo: produto.custo, precoVenda: produto.precoSugerido }}
            className="text-center text-xs font-medium text-brand-pink-400 hover:underline"
          >
            Simular lucro na calculadora →
          </Link>
        </div>
      </div>

      <section className="card-surface rounded-2xl p-5">
        <h2 className="mb-3 text-sm font-bold text-gray-100">📊 Diagnóstico de Mercado</h2>
        <p className="mb-4 text-sm text-gray-400">{produto.diagnostico.resumo}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-500">Pontos fortes</h3>
            <ul className="flex flex-col gap-1.5 text-sm text-gray-300">
              {produto.diagnostico.pontosFortes.map((ponto) => (
                <li key={ponto} className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  {ponto}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">Riscos</h3>
            <ul className="flex flex-col gap-1.5 text-sm text-gray-300">
              {produto.diagnostico.riscos.map((risco) => (
                <li key={risco} className="flex gap-2">
                  <span className="text-red-400">!</span>
                  {risco}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-white/5 pt-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Público-alvo</p>
            <p className="text-gray-300">{produto.diagnostico.publicoAlvo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sazonalidade</p>
            <p className="text-gray-300">{produto.diagnostico.sazonalidade}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Concorrência</p>
            <p className={CONCORRENCIA_COR[produto.diagnostico.concorrencia]}>{produto.diagnostico.concorrencia}</p>
          </div>
        </div>
      </section>

      <section className="card-surface rounded-2xl p-5">
        <h2 className="mb-3 text-sm font-bold text-gray-100">🏭 Fornecedores</h2>
        <div className="flex flex-col gap-3">
          {produto.fornecedores.map((fornecedor) => (
            <a
              key={fornecedor.id}
              href={fornecedor.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-100">{fornecedor.nome}</p>
                <p className="text-xs text-gray-500">
                  {fornecedor.origem} • Prazo {fornecedor.prazoEntregaDias[0]}-{fornecedor.prazoEntregaDias[1]} dias •
                  Pedido mín. {fornecedor.pedidoMinimo}un
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-100">{formatarMoeda(fornecedor.precoUnitario)}</p>
                  <p className="text-xs text-gray-500">confiabilidade {fornecedor.confiabilidade}%</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="card-surface rounded-2xl p-5">
        <h2 className="mb-3 text-sm font-bold text-gray-100">🗺️ Plano de Ação</h2>
        <ol className="flex flex-col gap-3">
          {produto.planoDeAcao.map((passo, index) => (
            <li key={passo.titulo} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-pink-500/20 text-xs font-bold text-brand-pink-400">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-100">{passo.titulo}</p>
                <p className="text-xs text-gray-400">{passo.descricao}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-2">
        {produto.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
