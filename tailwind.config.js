/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        desktop: "1200px",
      },
      colors: {
        samson: {
          void: "#03040A",
          panel: "#080B14",
          muted: "#8B9BB5",
          blue: "#4F8CFF",
          deep: "#0F1596",
          glow: "#1E3AFA",
          accent: "#5B9DFF",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        glow: "0 0 40px rgba(79, 140, 255, 0.45)",
      },
    },
  },
  plugins: [],
};
