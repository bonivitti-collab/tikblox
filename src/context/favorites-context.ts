import { createContext } from 'react'

export interface FavoritesContextValue {
  favoritos: string[]
  alternarFavorito: (produtoId: string) => void
  ehFavorito: (produtoId: string) => boolean
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)
