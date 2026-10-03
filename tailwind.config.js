/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
        },
        colors: {
            brand: {
                navy: '#0f172a',
                slate: '#1e293b',
                blue: '#2563eb',
                blueLight: '#0284c7',
                amber: '#f59e0b',
                amberHover: '#d97706',
            }
        }
    }
  },
  plugins: [],
}
