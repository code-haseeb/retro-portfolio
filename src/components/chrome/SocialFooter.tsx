import { socials } from '../../data/portfolio'

export function SocialFooter() {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--surface)]/95 px-4 py-4 backdrop-blur-sm">
      <nav aria-label="Social links" className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-4">
        {socials.map((social) => (
          <a
            key={social.label}
            className="focus-ring mono-inline border border-[var(--border)] px-3 py-2 text-[0.64rem] tracking-wider text-[var(--text)] hover:bg-[var(--accent-soft)]"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
