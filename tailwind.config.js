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

      }
    }
  },
  plugins: [],
}

export default config;


