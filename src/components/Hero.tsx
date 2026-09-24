interface HeroProps {
  produtosMonitorados: number
  roiMedio: number
}

export default function Hero({ produtosMonitorados, roiMedio }: HeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[radial-gradient(ellipse_at_top_left,_rgba(254,44,85,0.12),_transparent_55%)] p-5 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 rounded-full border border-brand-pink-500/30 bg-brand-pink-500/10 px-3 py-1.5 text-[11px] font-bold text-brand-pink-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-pink-500" />
          Varredura: TikTok US + Douyin China + Amazon
        </span>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-gray-400">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">⚡ Guia Rápido</span>
          <span>
            <span className="font-bold text-white">{produtosMonitorados}</span> produtos monitorados
          </span>
          <span className="text-white/20">|</span>
          <span>
            <span className="font-bold text-brand-cyan-400">{roiMedio.toFixed(0)}%+</span> ROI / Margem
          </span>
        </div>
      </div>

      <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
        Descubra produtos virais no exterior antes de{' '}
        <span className="bg-gradient-to-r from-brand-pink-400 to-brand-cyan-400 bg-clip-text text-transparent">
          estourarem no Brasil
        </span>
        .
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
        Monitore produtos que estão explodindo nos EUA e China antes de chegarem ao Brasil. Lucre com alta margem e
        concorrência incipiente.
      </p>
    </div>
  )
}
