import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../providers/useTheme'
import { PixelButton } from '../ui/PixelButton'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <PixelButton
      aria-label="Toggle light and dark theme"
      onClick={toggleTheme}
      tone="ghost"
      className="!px-3 !py-2"
    >
      <span className="inline-flex items-center gap-2">
        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </PixelButton>
  )
}
