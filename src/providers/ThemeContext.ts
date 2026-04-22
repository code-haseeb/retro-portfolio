import { createContext } from 'react'
import type { ThemeMode } from '../config/theme'

export type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
