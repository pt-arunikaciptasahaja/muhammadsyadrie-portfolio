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
        abyss: "#1a1f47",
        graphite: "#0f275f",
        panel: "#143f99",
        "panel-strong": "#244ba9",
        line: "rgba(97, 112, 187, 0.42)",
        platinum: "#fcffda",
        muted: "#6170bb",
        white: "#fcffda",
        black: "#0f275f",
        whiteglass: "rgba(252, 255, 218, 0.08)",
        slate: {
          50: "#fcffda",
          100: "#fcffda",
          200: "#fff4d3",
          300: "#fcffda",
          400: "#6170bb",
          500: "#6170bb",
          600: "#244ba9",
          700: "#143f99",
          800: "#0f275f",
          900: "#1a1f47",
          950: "#0f275f"
        },
        cyan: {
          DEFAULT: "#ff594a",
          soft: "#ff6b51"
        },
        violet: {
          DEFAULT: "#6170bb",
          soft: "#244ba9"
        },
        emerald: {
          DEFAULT: "#fcffda",
          soft: "#fff4d3"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(97, 112, 187, 0.28)",
        "violet-glow": "0 0 56px rgba(255, 89, 74, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
