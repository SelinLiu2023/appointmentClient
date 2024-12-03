/** @type {import('tailwindcss').Config} */


const config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '150': '150px', 
        '300': '300px', 
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' }
        }
      },
      animation: {
        swing: 'swing 1s infinite ease-in-out'
      }
    }
  },
  plugins: [],
}

export default config;


