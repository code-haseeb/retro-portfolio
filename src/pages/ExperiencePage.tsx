import { useEffect, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { TimelineContainer } from '../components/timeline/TimelineContainer'
import { TimelineItem } from '../components/timeline/TimelineItem'
import { experiences } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ExperiencePage() {
  const [visibleCount, setVisibleCount] = useState(1)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= experiences.length) {
          window.clearInterval(timer)
          return count
        }

        return count + 1
      })
    }, 420)

    return () => window.clearInterval(timer)
  }, [reducedMotion])

  return (
    <AppShell
      title="Experience"
      subtitle="Career path across UI/UX design, web development, and penetration testing with security-first execution."
      exitTo="/menu"
    >
      <TimelineContainer>
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            item={experience}
            isVisible={reducedMotion || index < visibleCount}
          />
        ))}
      </TimelineContainer>
    </AppShell>
  )
}
