export type SocialLink = {
  label: string
  href: string
}

export type ExperienceItem = {
  id: string
  role: string
  company: string
  period: string
  summary: string
  highlights: string[]
}

export type ProjectItem = {
  slug: string
  title: string
  teaser: string
  overview: string
  keyFeatures: string[]
  image: string
  links: {
    live?: string
    repo?: string
  }
  skills: string[]
  domain: string
  timeline: string
  impact: string
  year: string
}
