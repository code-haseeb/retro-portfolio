import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INTRO_LOADING_MS } from '../config/animation'
import { PixelButton } from '../components/ui/PixelButton'

export function IntroPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const startGame = useCallback(() => {
    if (loading) return
    setLoading(true)
  }, [loading])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') startGame()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [startGame])

  useEffect(() => {
    if (!loading) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const next = Math.min(100, Math.floor((elapsed / INTRO_LOADING_MS) * 100))
      setProgress(next)

      if (next >= 100) {
        window.clearInterval(timer)
        navigate('/menu', { replace: true })
      }
    }, 60)

    return () => window.clearInterval(timer)
  }, [loading, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="retro-screen crt-fade w-full max-w-3xl p-6 text-center md:p-10">
        <p className="mono-inline text-[var(--accent-500)]">Insert Coin to Begin</p>
        <h1 className="pixel-title mt-6 text-base leading-relaxed md:text-lg">Muhammad Haseeb</h1>
        <p className="mt-5 text-sm text-[var(--text-soft)]">
          Press Enter or start manually. No auto-run. No shortcuts.
        </p>

        {!loading ? (
          <div className="mt-8">
            <PixelButton onClick={startGame} className="!px-8 !py-4">
              Start
            </PixelButton>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="mono-inline text-[0.62rem] text-[var(--text-soft)]">Loading Profile Sequence...</p>
            <div className="h-5 border-2 border-[var(--border)] bg-[var(--surface-soft)] p-0.5">
              <div
                className="h-full bg-[var(--accent-500)] transition-all"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
