# Altar de Cielo — Tarot, Akashic Records & Energetic Cleanses ✨

Bilingual (ES/EN) marketing site with a self-service admin panel, built with Next.js + Payload CMS and a clean architecture layout.

## Stack

- **Next.js 16** (App Router) + TypeScript — public site and admin in one app
- **Payload CMS 3** — admin panel at `/admin` with field-level ES/EN localization
- **SQLite** locally (zero setup) / **Postgres** in production via `DATABASE_URL`
- **Tailwind CSS 4** + **Motion** — fairy design system
- **next-intl** — locale-prefixed routing (`/es`, `/en`)
- **Resend** — contact form email notifications (optional)

## Getting started

```bash
cp .env.example .env   # set PAYLOAD_SECRET to a long random string
npm install
npm run seed           # creates admin user + bilingual sample content
npm run dev
```

- Site: http://localhost:3000 (redirects to `/es`)
- Admin: http://localhost:3000/admin — default seed credentials: `hola@altardecielo.com` / `cambiame-123` (change them!)

The database is a local SQLite file (`altar-de-cielo.db`) by default. To use Postgres instead, start one (e.g. `docker compose up -d`) and set `DATABASE_URL` in `.env`.

## Architecture

```
src/
├── domain/           # Entities + repository interfaces (no framework imports)
├── application/      # Use cases (getServices, submitContactRequest, ...)
├── infrastructure/   # Payload-backed repositories, Resend notifier, composition root
├── presentation/     # UI components + helpers
├── collections/      # Payload collection configs (CMS schema)
├── globals/          # Payload globals (site settings)
├── i18n/             # next-intl routing/request config
├── seed/             # Idempotent bilingual seed script
└── app/
    ├── (frontend)/[locale]/   # Public pages (home, services, about, faq, contact)
    └── (payload)/             # Payload admin UI + REST API
```

Pages talk only to the application layer via `getContainer()` (the composition root). When bookings or payments arrive, they slot in as new domain entities + use cases without touching the presentation patterns.

## Content management

Everything editable lives in the admin panel:

- **Services** — title, excerpt, rich description, benefits, price, duration, modality, image, accent color
- **Testimonials, FAQs** — with drag-free `order` field for sorting
- **Contact requests** — every form submission is stored here (plus emailed if Resend is configured)
- **Site settings** — hero copy, about page, WhatsApp number, social links

Use the locale switcher in the admin top bar to edit Spanish and English content.

## Email notifications

Set `RESEND_API_KEY`, `CONTACT_EMAIL_TO` and (optionally) `CONTACT_EMAIL_FROM` in `.env`. Without them, contact submissions are still stored in the CMS — nothing is lost.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed` | Seed admin user + bilingual demo content (idempotent) |
| `npm run generate:types` | Regenerate `payload-types.ts` after schema changes |
| `npm run typecheck` | TypeScript check |

## Deployment (Vercel + Neon)

1. Create a Neon Postgres database and set `DATABASE_URL` in Vercel env vars.
2. Set `PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL` (your production URL).
3. Optionally set the Resend variables for contact emails.
4. For media uploads in production, add a storage adapter (e.g. `@payloadcms/storage-vercel-blob`) — local disk storage does not persist on serverless.
# altardecielo
