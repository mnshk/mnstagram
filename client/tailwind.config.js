/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        igblue: {
          100: '#47afff',
          200: '#0095F6',
          300: '#00376B',
        },
        igbg: {
          100: '#FAFAFA',
        },
        igborder:{
          100:'rgb(219, 219, 219)'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
