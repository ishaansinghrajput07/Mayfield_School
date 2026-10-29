/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Public site's outer section width - wider than the app-wide 7xl
      // (1280px) so landing sections use more of the screen on large
      // desktops (1440-1920px) without touching any dashboard layout.
      maxWidth: {
        site: "1600px",
      },
      colors: {
        // Mayfield Global School identity, taken from the school crest:
        // crest red, ink-navy for text and dark surfaces, and the sun gold.
        // Teal now maps to the house-colour green; coral to crest red.
        navy: {
          50: "#eef2f9",
          100: "#dbe3f1",
          200: "#bccbe4",
          300: "#8499bd",
          400: "#5f759d",
          500: "#2f56a6",
          600: "#284a8e",
          700: "#213d75",
          800: "#192f5a",
          900: "#121f3d",
        },
        school: {
          blue: "#2f56a6",
          "blue-dark": "#213d75",
          red: "#d3202b",
          "red-dark": "#a8161f",
        },
        // The four house colours worn by students (red, yellow, green, blue).
        house: {
          red: "#d3202b",
          yellow: "#f2b91b",
          green: "#2e9a57",
          blue: "#2a57b5",
        },
        teal: {
          50: "#eaf6ee",
          100: "#cdebd7",
          500: "#2e8b57",
          600: "#257349",
          700: "#1d5a39",
        },
        amber: {
          50: "#fbf4e3",
          100: "#f4e3b6",
          500: "#c8962e",
          600: "#a87a1f",
        },
        violet: {
          50: "#eef2f9",
          100: "#dbe3f1",
          400: "#6c86bd",
          500: "#2f56a6",
          600: "#284a8e",
          700: "#213d75",
        },
        coral: {
          50: "#fdeced",
          100: "#f9d0d3",
          400: "#e36a72",
          500: "#d3202b",
          600: "#a8161f",
        },
        surface: "#f4f6fa",
        paper: {
          DEFAULT: "#f5f7fb",
          dark: "#e9eef6",
        },
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Hind", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        // Public-site headline face: a bookish humanist serif.
        serif: ["Alegreya", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 30, 49, 0.06), 0 1px 3px 0 rgba(16, 30, 49, 0.08)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -15px rgba(47, 86, 166, 0.3)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, 6%) scale(1.08)" },
          "66%": { transform: "translate(-3%, -4%) scale(0.96)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(18px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite reverse",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        "marquee-reverse": "marquee 22s linear infinite reverse",
      },
    },
  },
  plugins: [],
};