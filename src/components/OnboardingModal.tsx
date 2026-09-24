import { useState } from 'react'

interface Step {
  emoji: string
  titulo: string
  descricao: string
}

const STEPS: Step[] = [
  {
    emoji: '🔎',
    titulo: 'Descubra produtos virais',
    descricao:
      'Explore o feed com score viral, custo, venda sugerida e margem calculada automaticamente para cada produto.',
  },
  {
    emoji: '🧮',
    titulo: 'Calcule seu lucro',
    descricao: 'Use a calculadora para simular custo, frete e taxas antes de anunciar, e defina o preço ideal.',
  },
  {
    emoji: '⭐',
    titulo: 'Salve seus favoritos',
    descricao: 'Marque os produtos mais promissores e acesse-os depois na aba Favoritos, mesmo offline.',
  },
]

export default function OnboardingModal({ onConcluir }: { onConcluir: () => void }) {
  const [passo, setPasso] = useState(0)
  const step = STEPS[passo]
  const ultimoPasso = passo === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl">
        <div className="mb-4 text-5xl">{step.emoji}</div>
        <h2 className="mb-2 text-lg font-bold text-gray-100">{step.titulo}</h2>
        <p className="mb-6 text-sm text-gray-400">{step.descricao}</p>

        <div className="mb-6 flex justify-center gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s.titulo}
              className={`h-1.5 rounded-full transition-all ${
                i === passo ? 'w-6 bg-brand-pink-500' : 'w-1.5 bg-white/15'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {passo > 0 && (
            <button
              type="button"
              onClick={() => setPasso((p) => p - 1)}
              className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={() => (ultimoPasso ? onConcluir() : setPasso((p) => p + 1))}
            className="flex-1 rounded-xl bg-gradient-to-r from-brand-pink-500 to-brand-cyan-500 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            {ultimoPasso ? 'Começar' : 'Próximo'}
          </button>
        </div>

        {!ultimoPasso && (
          <button
            type="button"
            onClick={onConcluir}
            className="mt-4 text-xs font-medium text-gray-500 hover:text-gray-300"
          >
            Pular introdução
          </button>
        )}
      </div>
    </div>
  )
}
