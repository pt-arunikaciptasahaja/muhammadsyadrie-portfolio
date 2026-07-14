import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#0b0f19",
        graphite: "#111827",
        panel: "#121827",
        "panel-strong": "#182033",
        line: "rgba(148, 163, 184, 0.18)",
        platinum: "#f8fafc",
        muted: "#94a3b8",
        whiteglass: "rgba(255, 255, 255, 0.08)",
        cyan: {
          DEFAULT: "#f8fafc",
          soft: "#e5e7eb"
        },
        violet: {
          DEFAULT: "#d1d5db",
          soft: "#e5e7eb"
        },
        emerald: {
          DEFAULT: "#f3f4f6",
          soft: "#d1d5db"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(255, 255, 255, 0.12)",
        "violet-glow": "0 0 56px rgba(255, 255, 255, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
