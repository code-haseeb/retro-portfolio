# Retro Portfolio

Security-focused personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

This project presents Muhammad Haseeb's profile across software engineering, secure development, and penetration testing through a retro arcade-inspired interface.

## Highlights

- Intro/start flow with keyboard support and manual entry
- Main menu-based navigation with route-specific exit behavior
- Home, Experience, Projects, Project Detail, and Contact pages
- Project filtering by skills and related-project suggestions
- Theme toggle (light/dark) with consistent design tokens
- Reduced-motion support and keyboard-friendly interactions
- Frontend-only contact flow powered by FormSubmit

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- React Router 7
- Zod (client-side payload validation)

## Project Structure

```text
.
|- public/
|- src/
|  |- components/
|  |- config/
|  |- data/
|  |- hooks/
|  |- pages/
|  |- providers/
|  |- App.tsx
|  |- main.tsx
|- .env.example
|- vercel.json
```

## Routes

- `/` intro screen
- `/menu` main menu
- `/home` profile summary
- `/experience` timeline
- `/projects` project list + filter chips
- `/projects/:slug` project detail
- `/contact` contact form

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Set values for:

- `VITE_FORMSUBMIT_EMAIL`
- `VITE_CONTACT_EMAIL` (optional fallback display)

FormSubmit setup:

1. Set `VITE_FORMSUBMIT_EMAIL` to your real inbox address.
2. Submit the contact form once.
3. Confirm activation from the email sent by FormSubmit.

### 3. Start development server

```bash
npm run dev
```

### 4. Quality checks

```bash
npm run lint
npm run build
```

## Deployment

This repository is a static frontend app and can be deployed on any static host.

## License

This project is provided for portfolio and personal branding use.
