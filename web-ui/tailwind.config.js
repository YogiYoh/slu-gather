/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        communityPink: "#ec4899",
        communityOrange: "#fbbf24",
        communityYellow: "#fde68a",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"]
      }
    },
  },
  plugins: [],
}