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
        // Driven by CSS variables in globals.css so dark/light both work.
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        elevated: "hsl(var(--elevated) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        // Brand palette (fixed hues from the brief).
        primary: "#2563EB",
        secondary: "#06B6D4",
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
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "gradient-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
      },
      animation: {
        "edge-pulse": "edge-pulse 3.2s ease-in-out infinite",
        "node-breathe": "node-breathe 4s ease-in-out infinite",
        "gradient-drift": "gradient-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
