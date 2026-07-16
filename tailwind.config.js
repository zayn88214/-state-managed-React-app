/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Graphite/stone neutral scale — replaces the old blue "nova" scale.
        nova: {
          50: "#FAFAFA",
          100: "#F1F0EE",
          200: "#E3E1DC",
          300: "#CDC9C1",
          400: "#A29B8E",
          500: "#726A5D",
          600: "#524B41",
          700: "#3A342C",
          800: "#242019",
          850: "#1A1712",
          900: "#171310",
          950: "#0B0A08",
        },
        // Brass/gold — the single premium accent used for CTAs, links, badges.
        accent: {
          50: "#FBF4E7",
          100: "#F5E5C4",
          200: "#EBCC8D",
          300: "#DDB362",
          400: "#C89A44",
          500: "#B8862F",
          600: "#966D24",
          700: "#78561D",
          800: "#5C4216",
          900: "#41300F",
        },
        // Muted sage — reserved strictly for functional signals (stock/success), never decorative.
        sage: {
          400: "#7FA98C",
          500: "#5C8A6C",
          600: "#43704F",
        },
      },
      fontFamily: {
        display: ["'Manrope'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(11, 10, 8, 0.06)",
        card: "0 6px 24px rgba(11, 10, 8, 0.08)",
        floating: "0 20px 56px rgba(11, 10, 8, 0.2)",
        glow: "0 0 0 1px rgba(184, 134, 47, 0.16), 0 8px 28px rgba(184, 134, 47, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DDB362 0%, #B8862F 60%, #966D24 100%)",
        "ink-gradient": "linear-gradient(135deg, #3A342C 0%, #171310 100%)",
      },
      maxWidth: {
        "8xl": "1400px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
