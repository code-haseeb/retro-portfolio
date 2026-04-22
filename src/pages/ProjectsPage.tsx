import { useMemo, useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { FilterChips } from '../components/projects/FilterChips'
import { ProjectCard } from '../components/projects/ProjectCard'
import { PixelCard } from '../components/ui/PixelCard'
import { allSkills, projects } from '../data/portfolio'

export function ProjectsPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (selectedSkills.length === 0) return projects

    return projects.filter((project) => selectedSkills.every((skill) => project.skills.includes(skill)))
  }, [selectedSkills])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((active) =>
      active.includes(skill) ? active.filter((value) => value !== skill) : [...active, skill],
    )
  }

  return (
    <AppShell
      title="Projects"
      subtitle="Selected work across product design, full-stack web engineering, and offensive security assessments."
      exitTo="/menu"
    >
      <FilterChips
        skills={allSkills}
        selected={selectedSkills}
        onToggle={toggleSkill}
        onClear={() => setSelectedSkills([])}
      />
      {filtered.length === 0 ? (
        <PixelCard>
          <p className="mono-inline text-[var(--accent-500)]">No Match</p>
          <p className="mt-3 text-sm text-[var(--text-soft)]">
            Try removing one or more skill filters to reveal more projects.
          </p>
        </PixelCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </AppShell>
  )
}
