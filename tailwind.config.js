/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "transparent": "transparent",
      "pale-blue": "hsl(223, 100%, 88%)",
      "light-red": "hsl(354, 100%, 66%)",
      "gray": "hsl(0, 0%, 59%)",
      "very-dark-blue": "hsl(209, 33%, 12%)",
    },
    spacing: {
      "0": "0px",
      "1": "0.0625rem",
      "2": "0.125rem",
      "4": "0.25rem",
      "8": "0.5rem",
      "12": "0.75rem",
      "16": "1rem",
      "20": "1.25rem",
      "24": "1.5rem",
      "28": "1.75rem",
      "32": "2rem",
      "36": "2.25rem",
      "40": "2.5rem",
      "44": "2.75rem",
      "48": "3rem",
      "52": "3.25rem",
      "56": "3.5rem",
      "60": "3.75rem",
      "64": "4rem",
      "68": "4.25rem",
      "72": "4.5rem",
      "76": "4.75rem",
      "80": "5rem",
      "84": "5.25rem",
      "88": "5.5rem",
      "92": "5.75rem",
      "96": "6rem",
      "100": "6.25rem",
      "128": "8rem",
      "256": "16rem",
      "512": "32rem",
      "1024": "64rem",
    },
    fontWeight: {
      "300": "300",
      "600": "600",
      "700": "700",
    },
    extend: {
      fontFamily: {
        sans: [
          "Libre Franklin",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
}
