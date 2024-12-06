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
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        swing: 'swing 1s infinite ease-in-out',
        'slide-in': 'slideIn 3s ease-out forwards',
      }
    }
  },
  plugins: [],
}

export default config;


