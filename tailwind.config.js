/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D8751',
        'primary-dark': '#5A6F42',
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'system-ui', '-apple-system', 'sans-serif'],
      },
      direction: {
        'rtl': 'rtl',
      },
    },
  },
  plugins: [],
} 