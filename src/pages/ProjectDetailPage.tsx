import { Link, Navigate, useParams } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { PixelCard } from '../components/ui/PixelCard'
import { PixelButton } from '../components/ui/PixelButton'
import { projects } from '../data/portfolio'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)
  const similarProjects = project
    ? projects
        .filter((entry) => entry.slug !== project.slug)
        .map((entry) => ({
          item: entry,
          score: entry.skills.filter((skill) => project.skills.includes(skill)).length,
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((entry) => entry.item)
    : []

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <AppShell title={project.title} subtitle={project.teaser} exitTo="/projects">
      <div className="grid gap-4 lg:grid-cols-3">
        <PixelCard className="space-y-5 lg:col-span-2">
          <div>
            <p className="mono-inline text-[var(--accent-500)]">Overview</p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{project.overview}</p>
          </div>
          <div>
            <h3 className="pixel-title text-xs text-[var(--accent-500)]">Key Features</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--text)]">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </div>
        </PixelCard>

        <div className="space-y-4">
          <PixelCard>
            <h3 className="pixel-title text-xs text-[var(--accent-500)]">Key Tech</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="mono-inline border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-[0.58rem]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </PixelCard>

          <PixelCard>
            <h3 className="pixel-title text-xs">Project Snapshot</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-soft)]">
              <li>
                <span className="mono-inline text-[0.6rem] text-[var(--accent-500)]">Domain:</span>{' '}
                {project.domain}
              </li>
              <li>
                <span className="mono-inline text-[0.6rem] text-[var(--accent-500)]">Timeline:</span>{' '}
                {project.timeline}
              </li>
              <li>
                <span className="mono-inline text-[0.6rem] text-[var(--accent-500)]">Impact:</span>{' '}
                {project.impact}
              </li>
              <li>
                <span className="mono-inline text-[0.6rem] text-[var(--accent-500)]">Year:</span> {project.year}
              </li>
            </ul>
          </PixelCard>

          <div className="flex flex-col gap-3">
            {project.links.repo ? (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className="w-full">
                <PixelButton fullWidth tone="ghost">
                  GitHub
                </PixelButton>
              </a>
            ) : null}
            {project.links.live ? (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="w-full">
                <PixelButton fullWidth>Live Link</PixelButton>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {similarProjects.length > 0 ? (
        <section className="mt-8">
          <h3 className="pixel-title text-xs text-[var(--accent-500)]">More Similar Projects</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {similarProjects.map((item) => (
              <PixelCard key={item.slug} className="space-y-3">
                <p className="mono-inline text-[var(--accent-500)]">{item.year}</p>
                <h4 className="pixel-title text-[0.64rem]">{item.title}</h4>
                <p className="text-sm text-[var(--text-soft)]">{item.teaser}</p>
                <Link to={`/projects/${item.slug}`}>
                  <PixelButton fullWidth tone="ghost">
                    Open Project
                  </PixelButton>
                </Link>
              </PixelCard>
            ))}
          </div>
        </section>
      ) : null}
    </AppShell>
  )
}
