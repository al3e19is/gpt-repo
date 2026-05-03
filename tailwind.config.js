/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zen: ["var(--font-zen)"],
      },
      colors: {
        accent: "#b45309",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
  darkMode: "media",
};
