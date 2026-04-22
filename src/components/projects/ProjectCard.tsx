import { Link } from 'react-router-dom'
import type { ProjectItem } from '../../data/types'
import { PixelCard } from '../ui/PixelCard'
import { PixelButton } from '../ui/PixelButton'

type ProjectCardProps = {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <PixelCard className="flex h-full flex-col">
      <div className="mb-4 h-44 overflow-hidden border-2 border-[var(--border)]">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-h-32 flex-1">
        <p className="mono-inline text-[var(--accent-500)]">{project.year}</p>
        <h3 className="pixel-title mt-2 text-xs">{project.title}</h3>
        <p className="mt-3 text-sm text-[var(--text-soft)]">{project.teaser}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="mono-inline border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-[0.58rem]"
          >
            {skill}
          </span>
        ))}
      </div>
      <Link className="mt-4" to={`/projects/${project.slug}`}>
        <PixelButton fullWidth>View Project</PixelButton>
      </Link>
    </PixelCard>
  )
}
