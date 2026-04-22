import type { ExperienceItem } from '../../data/types'
import { PixelCard } from '../ui/PixelCard'

type TimelineItemProps = {
  item: ExperienceItem
  isVisible: boolean
}

export function TimelineItem({ item, isVisible }: TimelineItemProps) {
  return (
    <li className="relative mb-6">
      <span
        className="absolute -left-[41px] top-5 h-4 w-4 border-2 border-[var(--border)] bg-[var(--accent-500)]"
        aria-hidden="true"
      />
      <PixelCard
        className={isVisible ? 'crt-fade opacity-100' : 'pointer-events-none opacity-35'}
        aria-hidden={!isVisible}
      >
        <p className="mono-inline mb-2 text-[var(--accent-500)]">{item.period}</p>
        <h3 className="pixel-title text-xs md:text-sm">{item.role}</h3>
        <p className="mt-1 text-sm text-[var(--text-soft)]">{item.company}</p>
        <p className="mt-3 text-sm text-[var(--text-soft)]">{item.summary}</p>
        <ul className="mt-3 space-y-2 text-sm text-[var(--text)]">
          {item.highlights.map((highlight) => (
            <li key={highlight}>- {highlight}</li>
          ))}
        </ul>
      </PixelCard>
    </li>
  )
}
