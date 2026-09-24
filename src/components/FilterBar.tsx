import type { Niche, Origin } from '../types/product'

interface FilterBarProps {
  busca: string
  onBuscaChange: (valor: string) => void
  nicho: Niche | 'todos'
  onNichoChange: (valor: Niche | 'todos') => void
  origem: Origin | 'todos'
  onOrigemChange: (valor: Origin | 'todos') => void
  niches: Niche[]
  origins: Origin[]
}

const NICHE_ICON: Record<Niche, string> = {
  'Casa e Cozinha': '🏠',
  'Beleza e Cuidados': '✨',
  Pet: '🐾',
  Fitness: '💪',
  Eletrônicos: '⚡',
  'Moda e Acessórios': '💎',
  'Bebês e Infantil': '👶',
  Automotivo: '🚗',
}

export default function FilterBar({
  busca,
  onBuscaChange,
  nicho,
  onNichoChange,
  origem,
  onOrigemChange,
  niches,
  origins,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="card-surface flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          <input
            type="search"
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Buscar por produto, nicho ou palavra-chave..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-gray-100 placeholder:text-gray-500 focus:border-brand-pink-500/60 focus:outline-none focus:ring-1 focus:ring-brand-pink-500/40"
          />
        </div>

        <select
          value={origem}
          onChange={(e) => onOrigemChange(e.target.value as Origin | 'todos')}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-200 focus:border-brand-pink-500/60 focus:outline-none"
        >
          <option value="todos">🌍 Origem: Todas</option>
          {origins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-pink-900/30 hover:opacity-90"
        >
          ✨ Escanear com IA
        </button>
      </div>

      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onNichoChange('todos')}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
            nicho === 'todos'
              ? 'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white shadow-lg shadow-brand-pink-900/30'
              : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          🏷️ Todos os Nichos
        </button>
        {niches.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onNichoChange(n)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
              nicho === n
                ? 'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white shadow-lg shadow-brand-pink-900/30'
                : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {NICHE_ICON[n]} {n}
          </button>
        ))}
      </div>
    </div>
  )
}
