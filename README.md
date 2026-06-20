# Cinematic Developer Portfolio

A scroll-driven, dark, premium portfolio. Next.js 15 (App Router) · Tailwind v4 · GSAP · Three.js (R3F) · Lenis.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in your keys (optional for the contact form)
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run analyze              # bundle analyzer (ANALYZE=true)
```

## Fill in your content

All placeholder content lives in **`src/lib/content.ts`** — name, role, email,
socials, projects, skills, timeline, process. Edit that one file.

Also replace:

- `public/cv.pdf` — your real CV
- `public/og-image.jpg` — 1200×630 social card (≤150KB)
- About section photo: `src/components/sections/About.tsx` → swap the
  `[ your photo ]` placeholder for `<Image src="/profile.jpg" … />`

## Sections

Preloader · Nav · Hero (particle field) · Scroll Cinematic (the showstopper) ·
Work · Skills · About · Process · Contact · Footer.

## Notes

- **SplitText** is a hand-rolled free component (`src/components/ui/SplitText.tsx`) —
  no paid GSAP Club license needed.
- All animation respects `prefers-reduced-motion`; content stays visible.
- The contact form (`/api/contact`, Edge runtime) degrades gracefully without
  `RESEND_API_KEY` / Upstash keys — it returns a clear error instead of crashing.

## Environment variables

| Key | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send contact emails |
| `CONTACT_EMAIL` | Where inquiries land |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Rate limit (3/IP/hr) — optional |
