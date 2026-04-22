import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { PixelButton } from '../components/ui/PixelButton'

const menuItems = [
  { label: 'Home', path: '/home' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
] as const

export function MenuPage() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((value) => (value + 1) % menuItems.length)
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((value) => (value - 1 + menuItems.length) % menuItems.length)
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        navigate(menuItems[activeIndex].path)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, navigate])

  return (
    <AppShell
      title="Main Menu"
      subtitle="Use arrow keys and Enter, or click an option to continue."
      showGoTop={false}
    >
      <div className="retro-screen mx-auto flex w-full max-w-2xl flex-col gap-3 p-6">
        {menuItems.map((item, index) => (
          <PixelButton
            key={item.path}
            tone={activeIndex === index ? 'primary' : 'ghost'}
            fullWidth
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => navigate(item.path)}
            className="text-left"
          >
            {activeIndex === index ? '> ' : ''}
            {item.label}
          </PixelButton>
        ))}
      </div>
    </AppShell>
  )
}
