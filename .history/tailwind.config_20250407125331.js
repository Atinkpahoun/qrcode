/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'color-pulse': {
          '0%, 100%': { backgroundColor: '##0000FF' }, // blue-500
          '50%': { backgroundColor: '#60a5fa' },       // blue-400
        },
      },
      animation: {
        'color-pulse': 'color-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}