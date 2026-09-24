export default function Sparkline({ data, color = '#22d3ee' }: { data: number[]; color?: string }) {
  if (data.length === 0) return null

  const width = 100
  const height = 32
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((valor, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((valor - min) / range) * height
    return `${x},${y}`
  })

  const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`
  const gradientId = `spark-gradient-${color.replace('#', '')}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-8 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
