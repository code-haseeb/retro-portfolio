import type { ExperienceItem, ProjectItem, SocialLink } from './types'

export const heroRoles = [
  'Software Engineer',
  'Product Designer',
  'Product Developer',
  'Penetration Tester',
] as const

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/code-haseeb' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/codehaseeb' },
  { label: 'Instagram', href: 'https://www.instagram.com/code_haseeb' },
]

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-2',
    role: 'Penetration Tester',
    company: 'Independent',
    period: '2025 - Present',
    summary:
      'Performing web and API penetration tests to identify exploit paths and deliver practical remediation guidance.',
    highlights: [
      'Executed OWASP-aligned assessments for authentication, access control, and input handling flaws.',
      'Produced structured reports with severity scoring and proof-of-concept evidence.',
      'Retested remediations and worked with developers to validate secure fixes.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Web Developer',
    company: 'Freelance / Client Projects',
    period: '2023 - 2025',
    summary:
      'Built full-stack web applications with performance, maintainability, and secure coding practices in mind.',
    highlights: [
      'Developed responsive frontends and production APIs for business workflows.',
      'Implemented authentication, form validation, and role-aware access controls.',
      'Optimized page speed and deployment pipelines for reliable releases.',
    ],
  },
  {
    id: 'exp-1',
    role: 'UI/UX Designer',
    company: 'Upwork',
    period: '2021 - 2023',
    summary:
      'Designed user-centric interfaces and scalable design systems for web products across startup and client projects.',
    highlights: [
      'Created wireframes, high-fidelity prototypes, and interactive flows in Figma.',
      'Improved onboarding and checkout usability using user feedback loops.',
      'Maintained reusable UI components and visual consistency across pages.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'arcade-guard',
    title: 'Arcade Guard Platform',
    teaser: 'Threat monitoring dashboard with live triage workflows.',
    overview:
      'Arcade Guard is a security observability platform designed for SOC workflows. It centralizes telemetry ingestion, normalizes event streams, and prioritizes alerts using confidence scoring so teams can triage incidents faster with less noise.',
    keyFeatures: [
      'Real-time event stream processing with source-level normalization.',
      'Risk-prioritized incident queue with analyst-ready context panels.',
      'Response playbooks that standardize containment and postmortem handoff.',
      'Export-ready compliance reporting for weekly and monthly audits.',
    ],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['React', 'TypeScript', 'Node', 'SIEM'],
    domain: 'Security Operations',
    timeline: '16 weeks',
    impact: 'Reduced mean triage time by 38% in pilot usage.',
    year: '2026',
  },
  {
    slug: 'pipeline-fortress',
    title: 'Pipeline Fortress',
    teaser: 'Policy-driven DevSecOps automation for release confidence.',
    overview:
      'Pipeline Fortress is a DevSecOps control layer for modern delivery teams. It introduces policy gates, dependency provenance checks, and staged release controls to improve deployment safety without slowing throughput.',
    keyFeatures: [
      'Branch-aware policy engine for environment-specific release rules.',
      'Supply-chain validation with dependency integrity and license checks.',
      'Container posture checks integrated directly in pull request workflows.',
      'Progressive rollout guardrails with instant rollback triggers.',
    ],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['DevSecOps', 'Docker', 'Kubernetes', 'GitHub Actions'],
    domain: 'Platform Engineering',
    timeline: '12 weeks',
    impact: 'Cut failed production deployments by 42% after rollout.',
    year: '2025',
  },
  {
    slug: 'redline-audit',
    title: 'Redline Audit Kit',
    teaser: 'Pentest reporting and retest lifecycle accelerator.',
    overview:
      'Redline Audit Kit streamlines penetration testing delivery from discovery to retest closure. It standardizes evidence capture, vulnerability scoring, and remediation verification so security teams can communicate risk clearly to stakeholders.',
    keyFeatures: [
      'Structured finding templates aligned with CVSS and business impact.',
      'Evidence vault with timestamped screenshots and reproducible steps.',
      'Developer-facing remediation tickets with validation checkpoints.',
      'Retest mode that compares baseline and remediated security posture.',
    ],
    image:
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['Security', 'Python', 'Reporting', 'Automation'],
    domain: 'Offensive Security',
    timeline: '10 weeks',
    impact: 'Improved retest completion cycle from 14 days to 6 days.',
    year: '2024',
  },
  {
    slug: 'ux-flow-hub',
    title: 'UX Flow Hub',
    teaser: 'End-to-end product design system and usability playbook.',
    overview:
      'UX Flow Hub is a design operations project that unifies product wireframes, interaction patterns, and accessibility-ready component specs. It helped reduce design drift and improved handoff quality between design and engineering.',
    keyFeatures: [
      'Reusable design tokens for spacing, typography, and visual hierarchy.',
      'Interactive high-fidelity prototypes for core conversion journeys.',
      'Usability feedback board mapped to design revisions and release scope.',
      'Documentation templates for smoother design-to-dev implementation.',
    ],
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['UI/UX', 'Figma', 'Design System', 'User Research'],
    domain: 'Product Design',
    timeline: '9 weeks',
    impact: 'Improved task completion rate by 31% in user testing.',
    year: '2023',
  },
  {
    slug: 'merchantstack-web',
    title: 'MerchantStack Web',
    teaser: 'Secure commerce dashboard with analytics and role controls.',
    overview:
      'MerchantStack Web is a full-stack business dashboard built for online sellers to track orders, customer behavior, and operational metrics. The platform emphasizes secure session handling, validated inputs, and resilient API interactions.',
    keyFeatures: [
      'Role-based access control for admin, finance, and support operators.',
      'Server-validated forms and hardened API endpoints for core operations.',
      'Real-time KPI widgets for revenue, fulfillment, and churn signals.',
      'Responsive admin workflows optimized for desktop and mobile browsers.',
    ],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['React', 'TypeScript', 'Node', 'PostgreSQL'],
    domain: 'Web Application Engineering',
    timeline: '14 weeks',
    impact: 'Increased dashboard adoption by 45% within the first quarter.',
    year: '2025',
  },
  {
    slug: 'api-breach-lab',
    title: 'API Breach Lab',
    teaser: 'Hands-on API security testing suite for exploit simulation.',
    overview:
      'API Breach Lab is a controlled penetration testing environment for modern REST APIs. It simulates common exploit paths and helps engineering teams understand insecure patterns through reproducible attack scenarios and fix validation.',
    keyFeatures: [
      'Attack scenario packs covering broken auth and authorization bypass.',
      'Request mutation workflows for input validation and injection testing.',
      'Automated retest scripts to validate remediation across releases.',
      'Evidence-driven reporting output aligned to OWASP API Security Top 10.',
    ],
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/',
    },
    skills: ['Penetration Testing', 'OWASP', 'Burp Suite', 'Python'],
    domain: 'Application Security',
    timeline: '8 weeks',
    impact: 'Detected and remediated 17 high-risk API issues across pilot teams.',
    year: '2026',
  },
]

export const allSkills = Array.from(
  new Set(projects.flatMap((project) => project.skills)),
).sort((a, b) => a.localeCompare(b))
