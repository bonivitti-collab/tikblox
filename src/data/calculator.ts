import type { CalculatorInput, CalculatorResult } from '../types/product'

export function calcularResultado(input: CalculatorInput): CalculatorResult {
  const { custoProduto, frete, taxaPlataformaPercentual, taxaGatewayPercentual, precoVenda } = input

  const taxaPlataforma = precoVenda * (taxaPlataformaPercentual / 100)
  const taxaGateway = precoVenda * (taxaGatewayPercentual / 100)
  const taxasTotais = taxaPlataforma + taxaGateway
  const custoTotal = custoProduto + frete + taxasTotais
  const lucroLiquido = precoVenda - custoTotal
  const margemPercentual = precoVenda > 0 ? (lucroLiquido / precoVenda) * 100 : 0
  const roi = custoProduto + frete > 0 ? (lucroLiquido / (custoProduto + frete)) * 100 : 0

  return {
    custoTotal,
    taxasTotais,
    lucroLiquido,
    margemPercentual,
    roi,
  }
}
