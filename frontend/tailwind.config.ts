import type { Config } from "tailwindcss"

// Palette daddIA (PRD §3.1). Chargée par Tailwind v4 via `@config` dans styles/globals.css.
const config: Config = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#070407",
          secondary: "#0F0B0F",
          card: "#18121A",
          hover: "#1F1425",
        },
        accent: {
          crimson: "#C8103C",
          crimson2: "#F03068",
          violet: "#7A28B8",
          blue: "#2460D8",
        },
        text: {
          primary: "#F0EBF4",
          secondary: "#9A8FA5",
          muted: "#6B6075",
        },
        border: {
          subtle: "rgba(255,255,255,0.07)",
          accent: "rgba(200,16,60,0.2)",
          hover: "rgba(200,16,60,0.5)",
        },
        state: {
          success: "#2BB673",
        },
      },
    },
  },
}

export default config
