# Altar de Cielo — Tarot, Akashic Records & Energetic Cleanses ✨

Bilingual (ES/EN) static marketing site built with Next.js and a clean architecture layout. All content lives in code — no database, no CMS, no environment secrets.

## Stack

- **Next.js 16** (App Router) + TypeScript — fully prerendered static pages
- **Tailwind CSS 4** + **Motion** — fairy design system
- **next-intl** — locale-prefixed routing (`/es`, `/en`)

## Getting started

```bash
npm install
npm run dev
```

Site: http://localhost:3000 (redirects to `/es`)

## Editing content

All content is plain TypeScript in `src/content/`:

- `services.ts` — the three services (title, description, benefits, duration, modality, image, accent color) in both languages
- `faqs.ts` — frequently asked questions
- `site-settings.ts` — hero copy, about page, WhatsApp number, Instagram URL
- `testimonials.ts` — empty for now; the homepage section appears automatically once real testimonials are added

UI strings (labels, buttons, metadata) live in `messages/es.json` and `messages/en.json`. Service card images live in `public/images/services/`.

## Architecture

```
src/
├── domain/           # Entities + repository interfaces (no framework imports)
├── application/      # Use cases (getServices, getFaqs, ...)
├── infrastructure/   # Static content repositories + composition root
├── content/          # The actual site content (ES/EN)
├── presentation/     # UI components + helpers
├── i18n/             # next-intl routing/request config
└── app/(frontend)/[locale]/   # Public pages (home, services, about, faq, contact)
```

Pages talk only to the application layer via `getContainer()` (the composition root). If a CMS is ever needed again, it plugs back in by swapping the repository implementations — nothing else changes.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (prerenders all pages) |
| `npm run typecheck` | TypeScript check |

## Deployment (Vercel)

Push to `main` — no environment variables required. Optionally set `NEXT_PUBLIC_SERVER_URL` to the production URL so SEO metadata and the sitemap use the right domain.
