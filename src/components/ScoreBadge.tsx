interface ScoreBadgeProps {
  score: number
}

function corPorScore(score: number) {
  if (score >= 80) return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', ring: 'ring-emerald-500/30' }
  if (score >= 60) return { bg: 'bg-amber-500/15', text: 'text-amber-400', ring: 'ring-amber-500/30' }
  return { bg: 'bg-red-500/15', text: 'text-red-400', ring: 'ring-red-500/30' }
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const cor = corPorScore(score)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${cor.bg} ${cor.text} ${cor.ring}`}
      title="Score viral"
    >
      🔥 {score}
    </span>
  )
}
