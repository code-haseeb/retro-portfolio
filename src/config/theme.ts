export type ThemeMode = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'retro-theme-mode'

export function detectSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
