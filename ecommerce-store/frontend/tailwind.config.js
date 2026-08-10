/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f6', 100: '#d9f0e7', 500: '#0f9d68', 600: '#0c8156', 700: '#0a6a47'
        }
      }
    }
  },
  plugins: []
}
