import { type PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExitControl } from '../chrome/ExitControl'
import { GoToTop } from '../chrome/GoToTop'
import { SocialFooter } from '../chrome/SocialFooter'
import { ThemeToggle } from '../chrome/ThemeToggle'

type AppShellProps = PropsWithChildren<{
  title: string
  subtitle?: string
  exitTo?: string
  showFooter?: boolean
  showGoTop?: boolean
}>

export function AppShell({
  title,
  subtitle,
  children,
  exitTo,
  showFooter = true,
  showGoTop = true,
}: AppShellProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!exitTo) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        navigate(exitTo)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [exitTo, navigate])

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-6 md:px-8 md:pt-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>{exitTo ? <ExitControl to={exitTo} /> : null}</div>
          <ThemeToggle />
        </div>
        <header className="mb-6">
          <h1 className="pixel-title text-lg leading-relaxed md:text-xl">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-2xl text-[var(--text-soft)]">{subtitle}</p> : null}
        </header>
        {children}
        {showFooter && exitTo ? (
          <p className="mono-inline mt-8 text-center text-[0.62rem] text-[var(--text-soft)]">
            Use Exit button or Esc to go back
          </p>
        ) : null}
      </main>
      {showGoTop ? <GoToTop /> : null}
      {showFooter ? <SocialFooter /> : null}
    </div>
  )
}
