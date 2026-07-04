import type { Metadata, Viewport } from "next";
// Fonts are self-hosted via Fontsource (installed from npm), so the build never
// reaches Google Fonts. Family names: "Space Grotesk Variable", "Inter
// Variable", "JetBrains Mono Variable" (wired to CSS vars in globals.css).
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { Nav } from "@/components/nav";
import { AmbientBackground } from "@/components/ambient-background";
import { identity, about, contact } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL in your environment (used for OG/canonical/JSON-LD).
const SITE_URL = siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${identity.name} — AI/ML Engineer & Data Scientist`,
    template: `%s · ${identity.name}`,
  },
  description: about.shortBio,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Agentic AI",
    "LangGraph",
    "RAG",
    "LLM Fine-Tuning",
    "Generative AI",
    identity.name,
  ],
  authors: [{ name: identity.name }],
  creator: identity.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${identity.name} — AI/ML Engineer & Data Scientist`,
    description: about.shortBio,
    siteName: `${identity.name} Portfolio`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: identity.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — AI/ML Engineer`,
    description: about.shortBio,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
};

// Schema.org Person markup for rich results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: "AI/ML Engineer & Data Scientist",
  description: about.shortBio,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: [
    "Generative AI",
    "Agentic AI",
    "Retrieval-Augmented Generation",
    "LLM Fine-Tuning",
    "Computer Vision",
    "Natural Language Processing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AmbientBackground />
          <ScrollProgress />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
