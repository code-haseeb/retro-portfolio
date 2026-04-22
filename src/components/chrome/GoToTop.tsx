import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PixelButton } from '../ui/PixelButton'

export function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-4 z-30 md:right-6">
      <PixelButton
        aria-label="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        tone="ghost"
        className="!px-3 !py-2"
      >
        <ArrowUp size={14} />
      </PixelButton>
    </div>
  )
}
