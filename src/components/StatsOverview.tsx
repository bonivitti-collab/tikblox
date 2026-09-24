interface StatItem {
  label: string
  valor: string
  icone: string
  destaque?: 'positivo' | 'neutro'
}

export default function StatsOverview({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card-surface rounded-2xl p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">{stat.label}</span>
            <span aria-hidden="true">{stat.icone}</span>
          </div>
          <p
            className={`text-lg font-bold ${
              stat.destaque === 'positivo' ? 'text-emerald-400' : 'text-gray-100'
            }`}
          >
            {stat.valor}
          </p>
        </div>
      ))}
    </div>
  )
}

export type { StatItem }
