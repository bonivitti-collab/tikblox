import { useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FavoritesContext } from './favorites-context'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<string[]>('tikblox:favoritos', [])

  const value = useMemo(() => {
    const alternarFavorito = (produtoId: string) => {
      setFavoritos((atual) =>
        atual.includes(produtoId) ? atual.filter((id) => id !== produtoId) : [...atual, produtoId],
      )
    }
    const ehFavorito = (produtoId: string) => favoritos.includes(produtoId)
    return { favoritos, alternarFavorito, ehFavorito }
  }, [favoritos, setFavoritos])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
