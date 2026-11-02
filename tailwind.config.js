/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bella: {
          dark: '#1c1917',     // Stone 900
          primary: '#991b1b',  // Red 800 (Italian Crimson)
          secondary: '#ea580c',// Orange 600 (Terracotta accent)
          cream: '#fffbeb',    // Amber 50 (Warm background)
          card: '#ffffff',
          border: '#fde68a',   // Warm border
          green: '#15803d',    // Basil Green
          gold: '#d97706',     // Tuscan Gold
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
