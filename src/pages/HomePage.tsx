import { AppShell } from '../components/layout/AppShell'
import { PixelCard } from '../components/ui/PixelCard'
import { TypingText } from '../components/ui/TypingText'
import { heroRoles } from '../data/portfolio'

export function HomePage() {
  return (
    <AppShell
      title="Home"
      subtitle="Software Engineer focused on secure software architecture and penetration testing with practical, business-ready outcomes."
      exitTo="/menu"
    >
      <PixelCard className="max-w-5xl">
        <div className="grid items-start gap-6 md:grid-cols-[240px_1fr]">
          <div className="border-2 border-[var(--border)] bg-[var(--surface-soft)] p-3">
            <div className="flex aspect-square items-center justify-center border-2 border-dashed border-[var(--accent-500)] bg-[var(--surface)]">
              <div className="text-center">
                <p className="mono-inline text-[0.62rem] text-[var(--accent-500)]">PROFILE IMAGE</p>
                <p className="mt-2 text-xs text-[var(--text-soft)]">Placeholder</p>
              </div>
            </div>
          </div>
          <div>
            <p className="mono-inline text-[var(--accent-500)]">Muhammad Haseeb</p>
            <h2 className="pixel-title mt-4 text-sm leading-relaxed md:text-base">Secure Software Engineer</h2>
            <p className="mt-4 max-w-3xl text-[var(--text-soft)]">
              I design and build secure web applications, harden software delivery pipelines, and perform penetration testing to uncover exploitable risk before attackers do.
            </p>
            <p className="mt-5 text-sm">
              Core focus: <TypingText values={heroRoles} />
            </p>
          </div>
        </div>
      </PixelCard>
    </AppShell>
  )
}
