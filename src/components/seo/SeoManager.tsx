import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../../data/portfolio'

type SeoRouteMeta = {
  title: string
  description: string
  indexable: boolean
}

const BASE_NAME = 'Muhammad Haseeb'
const DEFAULT_DESCRIPTION =
  'Muhammad Haseeb portfolio showcasing secure software engineering, penetration testing, and production-ready web project delivery.'

const ROUTE_META: Record<string, SeoRouteMeta> = {
  '/': {
    title: 'Intro',
    description: 'Retro portfolio intro screen for Muhammad Haseeb, secure software engineer and penetration tester.',
    indexable: false,
  },
  '/menu': {
    title: 'Main Menu',
    description: 'Navigation menu for Muhammad Haseeb portfolio sections including home, experience, projects, and contact.',
    indexable: false,
  },
  '/home': {
    title: 'Home',
    description:
      'Muhammad Haseeb builds secure web applications, hardens software delivery pipelines, and performs practical penetration testing.',
    indexable: true,
  },
  '/experience': {
    title: 'Experience',
    description:
      'Professional experience across UI/UX design, web engineering, and security-focused penetration testing engagements.',
    indexable: true,
  },
  '/projects': {
    title: 'Projects',
    description:
      'Portfolio projects covering product engineering, DevSecOps, offensive security labs, and full-stack application delivery.',
    indexable: true,
  },
  '/contact': {
    title: 'Contact',
    description:
      'Contact Muhammad Haseeb for software engineering, secure development, and penetration testing opportunities.',
    indexable: true,
  },
}

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
}

export function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim() || window.location.origin
    const siteUrl = normalizeSiteUrl(configuredSiteUrl)
    const path = location.pathname
    const slugMatch = path.match(/^\/projects\/([^/]+)$/)

    let seoTitle = 'Portfolio'
    let seoDescription = DEFAULT_DESCRIPTION
    let indexable = true

    if (slugMatch) {
      const slug = decodeURIComponent(slugMatch[1])
      const project = projects.find((entry) => entry.slug === slug)
      if (project) {
        seoTitle = `${project.title} Project`
        seoDescription = project.teaser
      } else {
        seoTitle = 'Projects'
        seoDescription = ROUTE_META['/projects'].description
      }
    } else {
      const routeMeta = ROUTE_META[path]
      if (routeMeta) {
        seoTitle = routeMeta.title
        seoDescription = routeMeta.description
        indexable = routeMeta.indexable
      }
    }

    const fullTitle = `${BASE_NAME} | ${seoTitle}`
    const canonical = `${siteUrl}${path}`
    const robots = indexable ? 'index,follow' : 'noindex,nofollow'
    const ogImage = `${siteUrl}/og-image.svg`

    document.title = fullTitle

    upsertCanonical(canonical)
    upsertMetaByName('description', seoDescription)
    upsertMetaByName('robots', robots)
    upsertMetaByName('author', BASE_NAME)
    upsertMetaByName(
      'keywords',
      'Muhammad Haseeb, secure software engineer, penetration tester, web developer, portfolio, cybersecurity',
    )

    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:site_name', BASE_NAME)
    upsertMetaByProperty('og:title', fullTitle)
    upsertMetaByProperty('og:description', seoDescription)
    upsertMetaByProperty('og:url', canonical)
    upsertMetaByProperty('og:image', ogImage)

    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', fullTitle)
    upsertMetaByName('twitter:description', seoDescription)
    upsertMetaByName('twitter:image', ogImage)
  }, [location.pathname])

  return null
}
