/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: '#2C3E50',
        body: "#ECF0F1",
        text:"#2C3E50"
      },
      screens: {
        'xs': {'max': '500px'}, 
      },
    },
  },
  plugins: [],
}
