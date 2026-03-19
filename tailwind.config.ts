import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cfn: {
          // ── Primary palette ──────────────────────────────────────────────
          navy:         "#091E3A",       // PRIMARY DARK — deep navy
          "navy-800":   "#071529",       // darker navy — hover states
          "navy-100":   "#E8EDF5",       // very light navy — borders / subtle bg
          mid:          "#1C3A5E",       // mid navy — pill/badge backgrounds
          cream:        "#F8F6F1",       // PRIMARY LIGHT — page backgrounds
          "cream-dark": "#EEF3FB",       // subtle blue-tinted cream — alternating sections
          // ── Text & accents ───────────────────────────────────────────────
          charcoal:     "#091E3A",       // same as navy (consolidated)
          muted:        "#4D6E95",       // muted navy-family — secondary text
          "blue-text":  "#C8D8F0",       // light desaturated navy — text on dark backgrounds
        },
      },
      fontFamily: {
        // Primary: Nunito (loaded via Google Fonts / CSS var)
        sans:    ["var(--font-nunito)", '"Avenir Next"', "Avenir", "system-ui", "sans-serif"],
        // Secondary / brand: Times New Roman — for "CFN" and "Canadian Financial Network"
        serif:   ['"Times New Roman"', "Times", "serif"],
        display: ["var(--font-nunito)", '"Avenir Next"', "Avenir", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card:        "0 2px 8px rgba(9, 30, 58, 0.08)",
        "card-hover":"0 8px 24px rgba(9, 30, 58, 0.18)",
        nav:         "0 1px 0 rgba(9, 30, 58, 0.1)",
      },
      borderRadius: {
        card: "12px",
      },
      maxWidth: {
        content: "1200px",
        article: "720px",
        narrow:  "640px",
      },
      animation: {
        "grid-move":  "gridMove 20s linear infinite",
        "fade-in":    "fadeIn 0.4s ease-out",
        "slide-up":   "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "hero-fade":  "heroFade 1.5s ease-out forwards",
        "kb-1":       "kenBurns1 8s ease-out forwards",
        "kb-2":       "kenBurns2 8s ease-out forwards",
        "kb-3":       "kenBurns3 8s ease-out forwards",
      },
      keyframes: {
        gridMove: {
          "0%":   { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroFade: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        kenBurns1: {
          "0%":   { transform: "scale(1.04) translate(0%,    0%)" },
          "100%": { transform: "scale(1.18) translate(-2%,  -1%)" },
        },
        kenBurns2: {
          "0%":   { transform: "scale(1.04) translate(1%,    0%)" },
          "100%": { transform: "scale(1.18) translate(-1%,  -2%)" },
        },
        kenBurns3: {
          "0%":   { transform: "scale(1.04) translate(-1%,   1%)" },
          "100%": { transform: "scale(1.18) translate( 2%,  -2%)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
