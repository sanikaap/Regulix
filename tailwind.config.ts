import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Rubik", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))",
        cream: "hsl(var(--cream))",
        rule: "hsl(var(--rule))",
        red: "hsl(var(--red))",
        amber: "hsl(var(--amber))",
        green: "hsl(var(--green))",
        blue: "hsl(var(--blue))",
        "sidebar-bg": "hsl(var(--sidebar-bg))",
        "sidebar-fg": "hsl(var(--sidebar-fg))",
        "sidebar-muted": "hsl(var(--sidebar-muted))",
        "sidebar-active": "hsl(var(--sidebar-active))",
        "sidebar-hover": "hsl(var(--sidebar-hover))",
        "score-red-bg": "hsl(var(--score-red-bg))",
        "score-red-text": "hsl(var(--score-red-text))",
        "score-amber-bg": "hsl(var(--score-amber-bg))",
        "score-amber-text": "hsl(var(--score-amber-text))",
        "score-green-bg": "hsl(var(--score-green-bg))",
        "score-green-text": "hsl(var(--score-green-text))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover":
          "0 4px 12px 0 rgb(0 0 0 / 0.06), 0 2px 4px -1px rgb(0 0 0 / 0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
