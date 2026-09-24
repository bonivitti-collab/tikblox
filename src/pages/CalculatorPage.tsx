import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { calcularResultado } from '../data/calculator'
import { formatarMoeda, formatarPercentual } from '../utils/format'

interface LocationState {
  custo?: number
  precoVenda?: number
}

function CampoNumerico({
  label,
  valor,
  onChange,
  prefixo,
  sufixo,
}: {
  label: string
  valor: number
  onChange: (valor: number) => void
  prefixo?: string
  sufixo?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-gray-400">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-violet-500/60">
        {prefixo && <span className="text-sm text-gray-500">{prefixo}</span>}
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min={0}
          value={Number.isFinite(valor) ? valor : 0}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className="w-full bg-transparent text-sm text-gray-100 focus:outline-none"
        />
        {sufixo && <span className="text-sm text-gray-500">{sufixo}</span>}
      </div>
    </label>
  )
}

export default function CalculatorPage() {
  const location = useLocation()
  const state = location.state as LocationState | null

  const [custoProduto, setCustoProduto] = useState(state?.custo ?? 35)
  const [frete, setFrete] = useState(12)
  const [taxaPlataformaPercentual, setTaxaPlataformaPercentual] = useState(12)
  const [taxaGatewayPercentual, setTaxaGatewayPercentual] = useState(4.99)
  const [precoVenda, setPrecoVenda] = useState(state?.precoVenda ?? 129.9)

  const resultado = useMemo(
    () =>
      calcularResultado({
        custoProduto,
        frete,
        taxaPlataformaPercentual,
        taxaGatewayPercentual,
        precoVenda,
      }),
    [custoProduto, frete, taxaPlataformaPercentual, taxaGatewayPercentual, precoVenda],
  )

  const lucroPositivo = resultado.lucroLiquido >= 0

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100 md:text-2xl">Calculadora de Lucro e Margem</h1>
        <p className="mt-1 text-sm text-gray-500">
          Simule custo, frete e taxas para descobrir a margem e o lucro líquido antes de anunciar.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-surface flex flex-col gap-4 rounded-2xl p-5">
          <CampoNumerico label="Custo do produto" valor={custoProduto} onChange={setCustoProduto} prefixo="R$" />
          <CampoNumerico label="Frete" valor={frete} onChange={setFrete} prefixo="R$" />
          <CampoNumerico label="Preço de venda" valor={precoVenda} onChange={setPrecoVenda} prefixo="R$" />
          <CampoNumerico
            label="Taxa da plataforma"
            valor={taxaPlataformaPercentual}
            onChange={setTaxaPlataformaPercentual}
            sufixo="%"
          />
          <CampoNumerico
            label="Taxa do gateway de pagamento"
            valor={taxaGatewayPercentual}
            onChange={setTaxaGatewayPercentual}
            sufixo="%"
          />
        </div>

        <div className="card-surface flex flex-col gap-4 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-gray-100">Resultado</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-[11px] text-gray-500">Custo total</p>
              <p className="text-lg font-bold text-gray-100">{formatarMoeda(resultado.custoTotal)}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-[11px] text-gray-500">Taxas totais</p>
              <p className="text-lg font-bold text-gray-100">{formatarMoeda(resultado.taxasTotais)}</p>
            </div>
            <div className={`rounded-xl p-3 ${lucroPositivo ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              <p className={`text-[11px] ${lucroPositivo ? 'text-emerald-500' : 'text-red-400'}`}>Lucro líquido</p>
              <p className={`text-lg font-bold ${lucroPositivo ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatarMoeda(resultado.lucroLiquido)}
              </p>
            </div>
            <div className={`rounded-xl p-3 ${lucroPositivo ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              <p className={`text-[11px] ${lucroPositivo ? 'text-emerald-500' : 'text-red-400'}`}>Margem</p>
              <p className={`text-lg font-bold ${lucroPositivo ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatarPercentual(resultado.margemPercentual)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3">
            <p className="text-[11px] text-violet-300">ROI sobre investimento (custo + frete)</p>
            <p className="text-lg font-bold text-violet-200">{formatarPercentual(resultado.roi)}</p>
          </div>

          {!lucroPositivo && (
            <p className="text-xs text-red-400">
              ⚠️ Com esses valores o produto dá prejuízo. Ajuste o preço de venda ou reduza custos/taxas.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
