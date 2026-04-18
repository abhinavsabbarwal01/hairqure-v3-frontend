import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        ink: { 50: "#f6f8fb", 100: "#e9eef5", 200: "#cdd7e6", 300: "#9fb0c7", 400: "#6b7f9a", 500: "#465975", 600: "#2f415c", 700: "#1f2e45", 800: "#14213a", 900: "#0b1629" },
        brand: { 50: "#eef5ff", 100: "#d9e8ff", 200: "#b7d2ff", 300: "#88b4ff", 400: "#558eff", 500: "#2f6bff", 600: "#1a4fe6", 700: "#143fb8", 800: "#143791", 900: "#112e74", DEFAULT: "#1a4fe6" },
        accent: { mint: "#22c1a4", amber: "#ffb547", rose: "#ff6b7a" },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(15 23 42 / 0.06), 0 8px 24px -4px rgb(15 23 42 / 0.08)",
        ring: "0 0 0 4px rgb(26 79 230 / 0.12)",
        glow: "0 20px 60px -20px rgb(26 79 230 / 0.45)",
      },
      borderRadius: { xl: "0.9rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.8,.2,1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
