/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customGreen: "#db2777",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #db2777, #e879f9)',
      }
    },
  },
  plugins: [],
}
