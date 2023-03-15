/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'brand': '#2C2C31',
        'selected': '#006EE6',
        'darkBtnText': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
