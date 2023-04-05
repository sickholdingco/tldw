/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        dimmedBlack: "#1c2128",
        dimmedWhite: "#cdd9e5",
        blueAccent: "rgba(65, 132, 228, 0.15)",
        blueHighlight: "#539bf5",
        dimmed: {
          50: "#cdd9e5",
          100: "#adbac7",
          200: "#909dab",
          300: "#768390",
          400: "#636e7b",
          500: "#545d68",
          600: "#444c56",
          700: "#373e47",
          800: "#2d333b",
          900: "#22272e",
        },
      },
    },
  },
  plugins: [],
};
