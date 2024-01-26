/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
      serif: ["Merriweather", "serif"],
      display: ["Love Ya Like A Sister", "sans-serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        none: "0",
        sm: ".125rem",
        DEFAULT: ".25rem",
        lg: ".5rem",
        full: "9999px",
      },
    },
  },
  daisyui: {
    themes: ["cupcake", "cmyk", "emerald", "light"],
  },
  darkMode: "class",
  plugins: [require("daisyui")],
};
