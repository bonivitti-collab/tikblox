import type { Product } from '../types/product'

interface IntelligenceOverviewProps {
  products: Product[]
}

const PULSE_NICHES = [
  { icon: '⚡', name: 'Gadgets & Tech', count: 7, acceleration: '+90%', speed: 100, color: 'brand-pink' },
  { icon: '🏠', name: 'Casa & Cozinha', count: 4, acceleration: '+83%', speed: 100, color: 'brand-pink' },
  { icon: '💪', name: 'Fitness & Treino', count: 1, acceleration: '+104%', speed: 88, color: 'brand-pink' },
  { icon: '✨', name: 'Beleza & Estética', count: 1, acceleration: '+82%', speed: 77, color: 'brand-pink' },
]

const TOP_NICHES = [
  { rank: '#1 MAIS INCIPIENTE', icon: '⚡', name: 'Gadgets & Tech', count: 7, score: 94, margin: '+312%', tone: 'amber' },
  { rank: '#2 ONDA FORTE', icon: '🏠', name: 'Casa & Cozinha', count: 4, score: 94, margin: '+326%', tone: 'emerald' },
  { rank: '#3 ALTA MARGEM', icon: '💪', name: 'Fitness & Treino', count: 1, score: 95, margin: '+290%', tone: 'cyan' },
]

function toneClasses(tone: string) {
  if (tone === 'amber') return 'border-amber-500/40 bg-amber-500/10 text-amber-400'
  if (tone === 'emerald') return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
  return 'border-brand-cyan-500/40 bg-brand-cyan-500/10 text-brand-cyan-400'
}

export default function IntelligenceOverview({ products }: IntelligenceOverviewProps) {
  const topProduct = products[0]

  return (
    <div className="flex flex-col gap-5">
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101119]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg">🌐</span>
              <h2 className="text-base font-bold text-white">Mapa de Calor de Intensidade Viral Global</h2>
              <span className="rounded-full border border-brand-pink-500/30 bg-brand-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-pink-400">
                🔥 LiberRadar
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Projeção D3 mapeando epicentros virais dos EUA & China que estão inundando o mercado brasileiro.</p>
          </div>
          <div className="flex rounded-lg border border-white/10 bg-black/20 p-1 text-[11px] font-semibold">
            <span className="rounded-md bg-white/10 px-3 py-1.5 text-white">Volume</span>
            <span className="px-3 py-1.5 text-gray-500">Score Viral</span>
            <span className="px-3 py-1.5 text-gray-500">Margem</span>
          </div>
        </div>
        <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-3">
          <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
            <p className="text-xs font-bold text-white">🇺🇸 EUA - TikTok Shop US</p>
            <p className="mt-1 text-[11px] text-gray-400">11 produtos virais • <b className="text-brand-pink-400">94/100 Score</b></p>
          </div>
          <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
            <p className="text-xs font-bold text-white">🇨🇳 China - Douyin & Fábricas</p>
            <p className="mt-1 text-[11px] text-gray-400">287 produtos fábrica • <b className="text-brand-cyan-400">96/100 Score</b></p>
          </div>
          <div className="bg-emerald-500/5 p-4">
            <p className="text-xs font-bold text-emerald-400">🇧🇷 Brasil (Mercado Destino)</p>
            <p className="mt-1 text-[11px] text-gray-400">Janela de arbitragem: 14 a 28 dias antes de saturar</p>
          </div>
        </div>
        <div className="relative h-56 overflow-hidden bg-[radial-gradient(ellipse_at_center,_#181b29_0%,_#0b0c12_72%)] sm:h-72">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(120,130,160,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(120,130,160,.16)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute left-[11%] top-[26%] h-16 w-28 rounded-[45%] bg-brand-pink-500/70 blur-sm sm:h-24 sm:w-44" />
          <div className="absolute right-[14%] top-[24%] h-20 w-32 rounded-[45%] bg-brand-cyan-500/70 blur-sm sm:h-28 sm:w-48" />
          <div className="absolute left-[43%] bottom-[17%] h-16 w-24 rounded-[45%] bg-emerald-500/60 blur-sm sm:h-24 sm:w-36" />
          <div className="absolute left-[13%] top-[35%] text-[10px] font-bold text-white">US USA (11)</div>
          <div className="absolute right-[20%] top-[35%] text-[10px] font-bold text-white">CN CHINA (287)</div>
          <div className="absolute left-[42%] bottom-[27%] text-[10px] font-bold text-emerald-300">BR BRASIL (DESTINO)</div>
          <div className="absolute left-[18%] top-[45%] h-2.5 w-2.5 rounded-full bg-brand-pink-400 ring-4 ring-brand-pink-500/30" />
          <div className="absolute right-[23%] top-[45%] h-2.5 w-2.5 rounded-full bg-brand-cyan-400 ring-4 ring-brand-cyan-500/30" />
          <div className="absolute left-[45%] bottom-[31%] h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/30" />
          <div className="absolute left-[20%] top-[48%] h-px w-[29%] rotate-[32deg] bg-gradient-to-r from-brand-pink-500 to-emerald-400" />
          <div className="absolute right-[25%] top-[50%] h-px w-[28%] -rotate-[28deg] bg-gradient-to-r from-brand-cyan-500 to-emerald-400" />
        </div>
        <div className="flex flex-wrap gap-4 border-t border-white/10 px-5 py-3 text-[10px] font-semibold text-gray-400">
          <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-pink-500" />EUA (TikTok Shop US / Amazon)</span>
          <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-cyan-400" />China (Douyin / 1688)</span>
          <span className="text-emerald-400"><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />Brasil (Entrada / Arbitragem)</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101119]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg">〽️</span>
              <h2 className="text-base font-bold text-white">Trend Pulse™ <span className="text-[10px] font-mono text-gray-400">[EARLY WAVE SPIKE RADAR]</span></h2>
              <span className="rounded-full border border-brand-pink-500/30 bg-brand-pink-500/10 px-2 py-0.5 text-[10px] font-bold text-brand-pink-400">🔥 4 PICOS ATIVOS</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Analisa a taxa de aceleração de produtos Early Wave e dispara push de alta prioridade.</p>
          </div>
          <button type="button" className="rounded-lg border border-brand-cyan-500/40 bg-brand-cyan-500/10 px-3 py-2 text-xs font-bold text-brand-cyan-400">↻ Varredura de Pulse</button>
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase text-gray-300">
            <span className="text-brand-cyan-400">ϟ Aceleração e velocidade por nicho <small className="ml-2 rounded bg-black/40 px-2 py-1 text-[10px] text-gray-400">Sensibilidade: +40%</small></span>
            <span className="text-[10px] normal-case text-gray-500">Gatilho de Disparo: <b className="text-gray-300">+30% (Alto) &nbsp; +45% (Padrão) &nbsp; +60% (Crítico)</b></span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {PULSE_NICHES.map((item) => (
              <div key={item.name} className="rounded-xl border border-brand-pink-500/50 bg-brand-pink-500/5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><p className="text-sm font-bold text-white">{item.icon} {item.name}</p><p className="mt-1 text-[11px] text-gray-400">{item.count} produtos Early Wave</p></div>
                  <span className="rounded-full bg-brand-pink-500/40 px-2 py-1 text-[10px] font-bold text-brand-pink-300">↗ {item.acceleration}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400"><span>Velocidade de Pulse</span><b className="text-brand-pink-400">{item.speed}/100</b></div>
                <div className="mt-2 h-1.5 rounded-full bg-black/50"><div className="h-full rounded-full bg-brand-pink-500" style={{ width: `${item.speed}%` }} /></div>
                <div className="mt-4 rounded-lg bg-black/30 p-2 text-[10px] text-gray-400">MAIOR ACELERAÇÃO:<br /><b className="text-gray-200">{topProduct?.nome ?? 'Produto em observação'}...</b></div>
                <button type="button" className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-xs font-bold text-gray-200">Filtrar Radar →</button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-3 text-[11px] text-gray-400">🟢 Monitoramento automático em segundo plano analisa o catálogo sempre que novos itens entram na fase Early Wave.</div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#101119] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div><h2 className="text-base font-bold text-white">〰️ Top 3 Nichos em &quot;Onda Inicial&quot; <span className="ml-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">✧ Oceano Azul BR</span></h2><p className="mt-1 text-xs text-gray-400">Maior volume de produtos virais no exterior com concorrência incipiente no Brasil.</p></div>
          <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400">Ver Somente Ondas →</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {TOP_NICHES.map((item) => (
            <div key={item.name} className="rounded-xl border border-white/10 bg-[#151723] p-4">
              <span className={`rounded-md border px-2 py-1 text-[10px] font-bold ${toneClasses(item.tone)}`}>{item.rank}</span>
              <p className="mt-4 text-base font-bold text-white">{item.icon} {item.name}</p>
              <p className="mt-2 text-sm text-gray-400"><b className="text-white">{item.count}</b> produtos em onda inicial</p>
              <div className="mt-4 grid grid-cols-2 border-t border-white/10 pt-3 text-[10px] uppercase text-gray-500"><span>Viralidade média<br /><b className="text-sm text-white">↗ {item.score}/100</b></span><span>Margem média<br /><b className="text-sm text-emerald-400">ϟ {item.margin}</b></span></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
