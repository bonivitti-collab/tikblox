import { useCallback, useEffect, useState } from 'react'

/**
 * Hook genérico para persistir estado no localStorage, usado por favoritos,
 * onboarding e preferências de filtro. Falha de forma silenciosa caso o
 * localStorage não esteja disponível (modo privado, SSR, etc).
 */
export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(chave)
      return item ? (JSON.parse(item) as T) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // Armazenamento indisponível — ignora silenciosamente.
    }
  }, [chave, valor])

  const limpar = useCallback(() => {
    try {
      window.localStorage.removeItem(chave)
    } catch {
      // ignora
    }
  }, [chave])

  return [valor, setValor, limpar] as const
}
