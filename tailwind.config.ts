import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Driven by CSS variables in globals.css.
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        elevated: "hsl(var(--elevated) / <alpha-value>)",
        border: "rgba(255,255,255,0.08)", // hairline
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        dim: "hsl(var(--dim) / <alpha-value>)",
        // Brand palette. Cyan is the single signature accent; blue + violet
        // are secondary and used sparingly (CTA gradients, a few key words).
        primary: "#2563EB",
        secondary: "#06B6D4", // the signature accent (also --accent)
        accent: "#7C3AED",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "edge-pulse": {
          "0%": { strokeDashoffset: "24", opacity: "0.15" },
          "50%": { opacity: "0.9" },
          "100%": { strokeDashoffset: "0", opacity: "0.15" },
        },
        "node-breathe": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
      },
      animation: {
        "edge-pulse": "edge-pulse 3.2s ease-in-out infinite",
        "node-breathe": "node-breathe 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
