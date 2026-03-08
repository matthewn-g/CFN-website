import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cfn: {
          navy:         "#0D2B55",
          "navy-800":   "#0A2244",
          "navy-100":   "#E8EDF5",
          // RBC-style bright yellow — used as accent only
          gold:         "#FFDF01",
          "gold-light": "#FFE840",
          cream:        "#FFFFFF",       // clean white — matches professional finance sites
          "cream-dark": "#EEF3FB",       // subtle light-blue for alternating sections
          charcoal:     "#1A1A2E",
          muted:        "#6B7280",
          "dark-bg":    "#0A0F1E",
          "dark-text":  "#E8EDF5",
          "dark-muted": "#9CA3AF",
        },
      },
      fontFamily: {
        sans:  ['"Times New Roman"', "Times", "Georgia", "serif"],
        serif: ['"Times New Roman"', "Times", "Georgia", "serif"],
        mono:  ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card:        "0 2px 8px rgba(13, 43, 85, 0.08)",
        "card-hover":"0 8px 24px rgba(13, 43, 85, 0.18)",
        nav:         "0 1px 0 rgba(13, 43, 85, 0.1)",
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
        // Hero slideshow
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
        // Hero photo crossfade
        heroFade: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Ken Burns directions — slow zoom + gentle pan
        kenBurns1: {
          "0%":   { transform: "scale(1.04) translate(0%,    0%)" },
          "100%": { transform: "scale(1.18) translate(-2%,  -1%)" },
        },
        kenBurns2: {
          "0%":   { transform: "scale(1.1)  translate(1%,    1%)" },
          "100%": { transform: "scale(1.0)  translate(-1%,  -2%)" },
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
