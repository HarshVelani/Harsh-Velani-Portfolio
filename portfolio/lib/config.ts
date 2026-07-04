/**
 * Central site configuration.
 *
 * Every value here is rendered in the browser, so each is read from a
 * NEXT_PUBLIC_* environment variable (see .env.example). Next.js inlines these
 * at build time. Set them in .env.local for local development, and in your
 * host's dashboard for production (Vercel: Project Settings > Environment
 * Variables). Each field has a safe fallback so the site still builds if a
 * variable is missing.
 */
export const siteConfig = {
  name: "Harsh Velani",
  title: "AI/ML Engineer & Data Scientist",

  // Contact
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@example.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "", // optional: hidden when blank
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "https://www.linkedin.com/",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/",

  // Resume: a Google Drive (or any) URL. Opens in a new tab.
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL ?? "/resume.pdf",

  location: process.env.NEXT_PUBLIC_LOCATION ?? "Ahmedabad, Gujarat, India",

  // Web3Forms access key for the contact form. Public by design (it only
  // accepts submissions), so NEXT_PUBLIC_ is correct. Get one free at
  // https://web3forms.com by entering your email.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",

  // Used for canonical URL, Open Graph and JSON-LD. No trailing slash.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
