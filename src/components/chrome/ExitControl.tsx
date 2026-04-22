import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PixelButton } from '../ui/PixelButton'

type ExitControlProps = {
  to: string
}

export function ExitControl({ to }: ExitControlProps) {
  const navigate = useNavigate()

  return (
    <PixelButton
      aria-label="Exit to menu"
      onClick={() => navigate(to)}
      tone="ghost"
      className="!px-3 !py-2"
    >
      <span className="inline-flex items-center gap-2">
        <LogOut size={14} /> Exit (Esc)
      </span>
    </PixelButton>
  )
}
