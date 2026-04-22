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
      <PixelCard className="mx-auto w-full max-w-6xl p-6 md:p-10 lg:p-14">
        <div className="grid min-h-[62vh] items-center gap-8 md:grid-cols-[300px_1fr] md:gap-10">
          <div className="border-2 border-[var(--border)] bg-[var(--surface-soft)] p-4 md:p-5">
            <div className="flex aspect-square items-center justify-center border-2 border-dashed border-[var(--accent-500)] bg-[var(--surface)]">
              <div className="text-center">
                <p className="mono-inline text-[0.68rem] text-[var(--accent-500)]">PROFILE IMAGE</p>
                <p className="mt-2 text-sm text-[var(--text-soft)]">Placeholder</p>
              </div>
            </div>
          </div>
          <div className="py-1 md:py-2">
            <h2 className="pixel-title text-base leading-relaxed md:text-2xl lg:text-3xl">
              muhmmad haseeb
            </h2>
            <p className="mt-4 max-w-4xl text-base text-[var(--text-soft)] md:text-lg">
              I design and build secure web applications, harden software delivery pipelines, and perform penetration testing to uncover exploitable risk before attackers do.
            </p>
            <p className="mt-5 text-base md:text-lg">
              Core focus: <TypingText values={heroRoles} />
            </p>
          </div>
        </div>
      </PixelCard>
    </AppShell>
  )
}
