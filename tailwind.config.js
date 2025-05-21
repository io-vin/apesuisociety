/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ethnocentric: ['Ethnocentric', 'sans-serif'],
      },
      colors: {
        'ape-bg': '#020202',
        'ape-text': '#FFFFFF',
        'ape-accent': '#76c0bf',
        'ape-search': '#6B7280',
      },
    },
  },
  plugins: [],
}