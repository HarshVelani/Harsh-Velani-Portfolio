# Harsh Velani — Portfolio

Premium personal portfolio for an AI/ML Engineer & Data Scientist. Built with the App Router, TypeScript, Tailwind, and Framer Motion. Dark-first, fully responsive, WCAG-minded, and tuned for a Lighthouse score above 95.

The signature element is a calm ambient "vector field" in the hero: a sparse drift of small dashes evoking points in an embedding space, a nod to the vector databases at the core of the stack.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict)
- **Tailwind CSS** with CSS-variable theming (dark/light)
- **Framer Motion** for scroll reveals, the mobile drawer, and micro-interactions
- **next-themes** for the theme toggle · **lucide-react** for icons
- shadcn-style primitives (`Button`, `Card`, `Badge`) hand-written with `cva` — no CLI init needed

No GSAP, no Three.js. The ambient background is a lightweight canvas particle field (capped density, pauses when the tab is hidden), which keeps the bundle small and performance high.

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

## Make it yours (env only)

All personal details live in environment variables. No source edits needed.

```bash
cp .env.example .env.local   # then fill in your values
```

`.env.local` keys (all must keep the `NEXT_PUBLIC_` prefix so they reach the browser):

| Key | What it sets |
| --- | --- |
| `NEXT_PUBLIC_EMAIL` | Contact email (mailto + form target) |
| `NEXT_PUBLIC_PHONE` | Optional phone; leave blank to hide it |
| `NEXT_PUBLIC_LINKEDIN` | LinkedIn profile URL |
| `NEXT_PUBLIC_GITHUB` | GitHub profile URL |
| `NEXT_PUBLIC_RESUME_URL` | Google Drive resume link (opens in a new tab) |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key for the contact form (free) |
| `NEXT_PUBLIC_LOCATION` | Location shown in hero + contact |
| `NEXT_PUBLIC_SITE_URL` | Deployed URL for canonical / Open Graph / JSON-LD |

Resume link: paste your Drive share URL. For a direct download rather than the
Drive preview, use the `https://drive.google.com/uc?export=download&id=FILE_ID`
form (see `.env.example`).

On Vercel/Netlify, set these same keys in the project's Environment Variables
dashboard rather than committing `.env.local`. Because `NEXT_PUBLIC_` values are
inlined at build time, redeploy after changing them.

Optional: add `public/og-image.png` (1200x630) for social previews. A local
`public/resume.pdf` still works if you prefer it over Drive: set
`NEXT_PUBLIC_RESUME_URL=/resume.pdf`.

### Contact form

The form submits through Web3Forms, a hosted form service, so there is no
backend of your own to run. The browser posts directly to their API with a
public access key. To enable it, get a free key at https://web3forms.com (enter
your email, no password) and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. The free
tier covers 250 submissions per month, which is far more than a portfolio needs.
Submissions arrive in your email. The form shows sending, success, and error
states, and includes a honeypot to deter spam. If the key is missing, the form
shows a friendly "not configured" message instead of failing silently.

## Project structure

```
app/
  layout.tsx        # fonts, SEO metadata, JSON-LD, theme provider, nav
  page.tsx          # section composition
  globals.css       # theme variables + base styles
components/
  nav.tsx           # sticky responsive nav + mobile drawer
  ambient-background.tsx # canvas vector-field background
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
