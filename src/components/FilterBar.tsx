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
    <div className="card-surface flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar produto, tag ou descrição..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-gray-100 placeholder:text-gray-500 focus:border-brand-pink-500/60 focus:outline-none focus:ring-1 focus:ring-brand-pink-500/40"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={nicho}
          onChange={(e) => onNichoChange(e.target.value as Niche | 'todos')}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-200 focus:border-brand-pink-500/60 focus:outline-none sm:flex-none"
        >
          <option value="todos">🏷️ Todos os nichos</option>
          {niches.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <select
          value={origem}
          onChange={(e) => onOrigemChange(e.target.value as Origin | 'todos')}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-200 focus:border-brand-pink-500/60 focus:outline-none sm:flex-none"
        >
          <option value="todos">🌍 Todas as origens</option>
          {origins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
