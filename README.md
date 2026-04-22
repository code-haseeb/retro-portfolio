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
- Serverless contact endpoint with validation and abuse protection

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- React Router 7
- Zod (client and server payload validation)
- Resend (serverless email delivery)

## Project Structure

```text
.
|- api/
|  |- _lib/
|  |  |- rateLimit.ts
|  |  |- security.ts
|  |  |- validation.ts
|  |- contact.ts
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

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `ALLOWED_ORIGINS`

### 3. Start development server

```bash
npm run dev
```

### 4. Quality checks

```bash
npm run lint
npm run build
```

## Security Notes

- Secrets are loaded from environment variables only.
- Contact payloads are validated and sanitized server-side.
- Request size checks and per-IP rate limiting are enforced.
- Honeypot field and origin checks are applied on contact requests.
- Security headers are configured in `vercel.json` and API responses.

## Deployment

This repository is ready for Vercel deployment:

1. Import repository in Vercel
2. Add environment variables from `.env.example`
3. Deploy

## License

This project is provided for portfolio and personal branding use.
