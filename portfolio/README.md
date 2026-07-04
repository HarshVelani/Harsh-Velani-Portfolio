# Harsh Velani — Portfolio

Premium personal portfolio for an AI/ML Engineer & Data Scientist. Built with the App Router, TypeScript, Tailwind, and Framer Motion. Dark-first, fully responsive, WCAG-minded, and tuned for a Lighthouse score above 95.

The signature element is an animated **agent-graph** motif in the hero — nodes and pulsing edges that echo the LangGraph / multi-agent orchestration the work is built on.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict)
- **Tailwind CSS** with CSS-variable theming (dark/light)
- **Framer Motion** for scroll reveals, the mobile drawer, and micro-interactions
- **next-themes** for the theme toggle · **lucide-react** for icons
- shadcn-style primitives (`Button`, `Card`, `Badge`) hand-written with `cva` — no CLI init needed

No GSAP, no Three.js: the animated background is CSS/SVG, which keeps the bundle small and performance high.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the build locally
```

Requires Node 18.17+.

## Make it yours (3 edits)

1. **`lib/data.ts`** — top of the file, the `contact` object. Replace the three `TODO` values (email, LinkedIn, GitHub). All site content lives in this one file if you ever want to tweak copy.
2. **`public/resume.pdf`** — drop your résumé in. The Resume buttons link here.
3. **`app/layout.tsx`** — set `SITE_URL` to your live URL (used for canonical + Open Graph), and add `public/og-image.png` (1200×630) for social previews.

That's it — nothing else is required to go live.

## Project structure

```
app/
  layout.tsx        # fonts, SEO metadata, JSON-LD, theme provider, nav
  page.tsx          # section composition
  globals.css       # theme variables + base styles
components/
  nav.tsx           # sticky responsive nav + mobile drawer
  agent-graph-bg.tsx# signature animated background
  typing-headline.tsx
  scroll-progress.tsx
  section.tsx       # shared section wrapper w/ scroll reveal
  project-card.tsx  # reusable expandable case-study card
  theme-provider.tsx / theme-toggle.tsx
  ui/               # Button, Card, Badge (cva)
  sections/         # hero, about, skills, experience, featured-projects,
                    # ai-projects, tech-stack, education, contact, footer
lib/
  data.ts           # ← single source of truth for all content
  utils.ts          # cn()
types/index.ts      # content models
```

## SEO

Handled in `app/layout.tsx`: title template, description, keywords, Open Graph, Twitter cards, robots directives, and Schema.org `Person` JSON-LD. Set `SITE_URL` and add `og-image.png` to complete it.

## Accessibility

Semantic landmarks, labelled controls, visible keyboard focus rings, `aria-expanded` on the case-study toggles, and `prefers-reduced-motion` respected globally (animations collapse to static).

## Deploy

### Vercel (recommended — zero config)

1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo.
3. Framework auto-detects as Next.js. Click **Deploy**. Done.
4. Add your custom domain under the project's **Domains** tab, then update `SITE_URL`.

### Netlify

1. Push to GitHub.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build command `next build`, publish handled by Netlify's Next.js runtime. Deploy.

Both platforms run `npm install && npm run build` for you — run `npm run build` locally once first to confirm it's green on your machine.

## Future enhancements

- Project screenshots / architecture diagrams (add to `public/images`, reference in `lib/data.ts`).
- Live GitHub stats via the GitHub API (a server component fetch).
- MDX case-study pages per project (wire the "Case study" button to a route).
- A real form backend (Resend, Formspree) to replace the mailto flow.
