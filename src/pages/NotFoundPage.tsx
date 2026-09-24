import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card-surface flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
      <p className="text-4xl">🧭</p>
      <h1 className="text-lg font-bold text-gray-100">Página não encontrada</h1>
      <p className="text-sm text-gray-500">O conteúdo que você procura não existe ou foi movido.</p>
      <Link to="/" className="mt-2 text-sm font-medium text-violet-400 hover:underline">
        Voltar para Todos os Produtos
      </Link>
    </div>
  )
}
