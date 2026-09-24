import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { calcularMargem, fetchProductById } from '../data/productsRepository'
import { formatarMoeda, formatarPercentual } from '../utils/format'
import { useFavorites } from '../hooks/useFavorites'
import type { Product } from '../types/product'

const SATURACAO_COR: Record<string, string> = {
  Baixa: 'text-emerald-400',
  Média: 'text-amber-400',
  Alta: 'text-red-400',
}

function construirLinksDiagnostico(produto: Product) {
  const termo = encodeURIComponent(produto.nome)
  return [
    {
      nome: 'Shopee Brasil',
      cor: 'text-amber-400',
      url: `https://shopee.com.br/search?keyword=${termo}`,
      texto:
        produto.saturacaoBR === 'Baixa'
          ? 'Poucos vendedores ativos; maioria com envio internacional lento e sem estoque nacional.'
          : produto.saturacaoBR === 'Média'
            ? 'Alguns vendedores já ativos, mas ainda com espaço para diferenciação de oferta.'
            : 'Mercado com vários vendedores estabelecidos e forte concorrência de preço.',
    },
    {
      nome: 'Mercado Livre Full',
      cor: 'text-yellow-300',
      url: `https://lista.mercadolivre.com.br/${termo}`,
      texto: 'Verifique concorrentes com Mercado Envios Full e compare preços/avaliações antes de precificar.',
    },
    {
      nome: 'TikTok Viral',
      cor: 'text-brand-pink-400',
      url: `https://www.tiktok.com/search?q=${termo}`,
      texto:
        produto.onda === 'onda-inicial'
          ? 'Oceano azul: vídeos começam a viralizar organicamente, poucos anunciantes estruturados.'
          : 'Já existem criadores/anunciantes explorando esse produto — analise os criativos de maior engajamento.',
    },
  ]
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ehFavorito, alternarFavorito } = useFavorites()
  const [produto, setProduto] = useState<Product | null | undefined>(undefined)
  const [linkCopiado, setLinkCopiado] = useState(false)
  const [ganchoCopiado, setGanchoCopiado] = useState<number | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

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

  async function copiarGancho(texto: string, index: number) {
    try {
      await navigator.clipboard.writeText(texto)
      setGanchoCopiado(index)
      setTimeout(() => setGanchoCopiado(null), 1500)
    } catch {
      // clipboard indisponível — sem ação adicional
    }
  }

  function mostrarAviso(mensagem: string) {
    setAviso(mensagem)
    setTimeout(() => setAviso(null), 2500)
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
  const lucroUnitario = produto.precoSugerido - produto.custo
  const favorito = ehFavorito(produto.id)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const textoCompartilhamento = `${produto.nome}: tendência viral de produtos do exterior. Lucro estimado de ${formatarMoeda(
    lucroUnitario,
  )} (+${formatarPercentual(margem, 0)}) e viralidade ${produto.scoreViral}/100.`

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/70 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8">
      <div className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden bg-[#11121a] shadow-2xl shadow-black/60 sm:max-h-[88vh] sm:rounded-2xl sm:border sm:border-white/10">
        {/* Header sticky */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/5 bg-[#11121a] p-5">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-brand-pink-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-pink-400 ring-1 ring-inset ring-brand-pink-500/30">
                Raio-X de Inteligência Tikblox
              </span>
              <span className="text-xs text-gray-500">{produto.nicho}</span>
            </div>
            <h1 className="text-lg font-bold leading-snug text-gray-100 sm:text-xl">{produto.nome}</h1>
            <p className="mt-1 text-xs italic text-gray-500">
              Nome de busca internacional: {produto.termoBuscaInternacional}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden items-center gap-1.5 rounded-lg border border-brand-cyan-500/30 bg-brand-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-brand-cyan-400 hover:bg-brand-cyan-500/20 sm:flex"
            >
              📄 Exportar PDF
            </button>
            <button
              type="button"
              onClick={compartilhar}
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10 sm:flex"
            >
              {linkCopiado ? '✅ Copiado' : '🔗 Compartilhar'}
            </button>
            <button
              type="button"
              onClick={() => alternarFavorito(produto.id)}
              aria-pressed={favorito}
              aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm hover:bg-white/10"
            >
              {favorito ? '⭐' : '☆'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Fechar"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-lg leading-none text-gray-400 hover:bg-white/10 hover:text-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Conteúdo com rolagem interna */}
        <div className="flex flex-col gap-6 overflow-y-auto p-5">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-brand-pink-500/20 bg-brand-pink-500/5 px-3 py-2 text-[10px] font-semibold">
            <span className="rounded-md bg-brand-cyan-500/10 px-1.5 py-0.5 text-brand-cyan-400">✨ SOCIAL PROOF</span>
            <span className="text-gray-400">
              Trend Velocity: <span className="text-brand-pink-400">{produto.trendVelocity}</span>
            </span>
            <span className="ml-auto text-gray-500">{produto.buscas} buscas</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="card-surface rounded-xl p-3">
              <p className="text-[11px] text-gray-500">Custo</p>
              <p className="text-base font-bold text-gray-100">{formatarMoeda(produto.custo)}</p>
            </div>
            <div className="card-surface rounded-xl p-3">
              <p className="text-[11px] text-gray-500">Venda sugerida</p>
              <p className="text-base font-bold text-gray-100">{formatarMoeda(produto.precoSugerido)}</p>
              <p className="text-[10px] text-gray-500">Preço de saída validado</p>
            </div>
            <div className="card-surface rounded-xl p-3">
              <p className="text-[11px] text-emerald-500">Margem bruta</p>
              <p className="text-base font-bold text-emerald-400">+{formatarPercentual(margem, 0)}</p>
              <p className="text-[10px] text-gray-500">Lucro bruto expressivo</p>
            </div>
            <div className="card-surface rounded-xl p-3">
              <p className="text-[11px] text-gray-500">Score de viralidade</p>
              <p className="text-base font-bold text-brand-pink-400">{produto.scoreViral}/100</p>
              <p className="text-[10px] text-gray-500">{produto.trendVelocity}</p>
            </div>
          </div>

          <section className="card-surface rounded-2xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-cyan-400">
              📄 Ficha de Viabilidade &amp; Arbitragem
            </h2>
            <p className="mb-2 inline-block rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-400">
              Origem: {produto.origem} • {produto.origemTendencia}
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Custo de fornecedor de <span className="font-bold text-gray-100">{formatarMoeda(produto.custo)}</span>{' '}
              com <span className="font-bold text-emerald-400">+{formatarPercentual(margem, 0)} de margem bruta</span>{' '}
              e preço sugerido de venda de <span className="font-bold text-gray-100">{formatarMoeda(produto.precoSugerido)}</span>.
              Tendência validada em {produto.origemTendencia}, com {produto.buscas} buscas recentes e saturação{' '}
              <span className={SATURACAO_COR[produto.saturacaoBR]}>{produto.saturacaoBR.toLowerCase()}</span> no Brasil.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
              <p className="text-xs text-gray-400">
                Lucro líquido unitário projetado: <span className="font-bold text-emerald-400">{formatarMoeda(lucroUnitario)}</span>
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-lg bg-brand-cyan-500/15 px-3 py-1.5 text-xs font-bold text-brand-cyan-400 hover:bg-brand-cyan-500/25"
              >
                📄 Exportar Ficha em PDF
              </button>
            </div>
          </section>

          <section className="card-surface rounded-2xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-100">
              🛍️ Diagnóstico de Mercado no Brasil (Oceano Azul)
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {construirLinksDiagnostico(produto).map((coluna) => (
                <div key={coluna.nome} className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`text-xs font-bold ${coluna.cor}`}>{coluna.nome}</span>
                    <a
                      href={coluna.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-brand-cyan-400 hover:underline"
                    >
                      Checar ↗
                    </a>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">{coluna.texto}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-brand-cyan-500/20 bg-brand-cyan-500/5 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-cyan-400">Entendimento cultural</p>
              <p className="mt-1 text-sm text-gray-300">{produto.entendimentoCultural}</p>
            </div>
          </section>

          <section id="ganchos" className="card-surface scroll-mt-24 rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-gray-100">🎬 Ganchos de Anúncio Testados (Primeiros 3 segundos)</h2>
              <a
                href="https://ads.tiktok.com/business/creativecenter/pc/en"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-[11px] font-semibold text-brand-cyan-400 hover:underline"
              >
                Ver Roteiros Completos ↗
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {produto.ganchosAnuncio.map((gancho, index) => (
                <div
                  key={gancho}
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/5 p-3"
                >
                  <p className="text-sm text-gray-200">"{gancho}"</p>
                  <button
                    type="button"
                    onClick={() => copiarGancho(gancho, index)}
                    className="shrink-0 rounded-lg border border-white/10 px-2 py-1 text-[11px] font-semibold text-gray-400 hover:bg-white/10"
                  >
                    {ganchoCopiado === index ? '✅' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface rounded-2xl p-5">
            <h2 className="mb-3 text-sm font-bold text-gray-100">📦 Onde Encontrar Fornecedores Rápidos</h2>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(produto.termoBuscaInternacional)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20"
              >
                AliExpress (Busca Direta) ↗
              </a>
              <a
                href={`https://cjdropshipping.com/search-results.html?keyword=${encodeURIComponent(produto.termoBuscaInternacional)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-200 hover:bg-white/10"
              >
                CJ Dropshipping ↗
              </a>
              <a
                href={`https://trends.google.com.br/trends/explore?geo=BR&q=${encodeURIComponent(produto.nome)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20"
              >
                Google Trends Brasil ↗
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Logística &amp; Despacho: consulte prazos e frete diretamente com o fornecedor antes de negociar o pedido
              mínimo.
            </p>
          </section>

          <section className="card-surface rounded-2xl p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-100">
              🗺️ Plano de Ação para Surfar Essa Onda
              <span className={`text-[10px] font-bold ${SATURACAO_COR[produto.saturacaoBR]}`}>
                Saturação BR: {produto.saturacaoBR}
              </span>
            </h2>
            <ul className="flex flex-col gap-2.5">
              {produto.planoDeAcao.map((passo) => (
                <li key={passo.titulo} className="flex gap-2.5 text-sm">
                  <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                  <span className="text-gray-300">
                    <span className="font-semibold text-gray-100">{passo.titulo}: </span>
                    {passo.descricao}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-surface rounded-2xl p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-gray-100">🌐 Metadados SEO &amp; Compartilhamento (tikblox.com.br)</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                ✓ OpenGraph &amp; Schema.org Ativo
              </span>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/20 p-3">
              <p className="truncate text-[11px] text-gray-500">tikblox.com.br/produto/{produto.id}</p>
              <p className="mt-1 text-sm font-bold text-gray-100">{produto.nome} | Radar Viral Tikblox</p>
              <p className="mt-1 text-xs text-gray-400">{textoCompartilhamento}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={compartilhar}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
              >
                {linkCopiado ? '✅ Copiado' : '📋 Copiar Link'}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${textoCompartilhamento} ${url}`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCompartilhamento)}&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
              >
                X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-brand-cyan-500/30 bg-brand-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-brand-cyan-400 hover:bg-brand-cyan-500/20"
              >
                LinkedIn
              </a>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            {produto.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer sticky */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-white/5 bg-[#11121a] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Margem líquida estimada: <span className="font-bold text-emerald-400">+{formatarPercentual(margem, 0)}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
              >
                📄 Exportar PDF
              </button>
              <button
                type="button"
                onClick={() => mostrarAviso('Integração com Google Workspace chega em breve.')}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
              >
                ☁️ Google Workspace
              </button>
              <button
                type="button"
                onClick={() => mostrarAviso('Geração de roteiros UGC chega em breve.')}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10"
              >
                🎬 Gerar Roteiros UGC
              </button>
            </div>
          </div>
          <Link
            to="/calculadora"
            state={{ custo: produto.custo, precoVenda: produto.precoSugerido }}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-cyan-500 to-brand-cyan-600 py-2.5 text-sm font-bold text-[#0b0c12] hover:opacity-90"
          >
            🧮 Simular Lucro Líquido
          </Link>
          {aviso ? <p className="text-center text-[11px] text-brand-cyan-400">{aviso}</p> : null}
        </div>
      </div>
    </div>
  )
}
