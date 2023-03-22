/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'bgLogin': "url('/src/assets/bgLogin.jpg')",
         'bgregis' :"url ('/src/assets/bgregis.jpg')"   
      },
      colors: {
        'lapak' : '#31CFB9'
      },
    },
  },
  plugins: [require("daisyui"), require('prettier-plugin-tailwindcss')],
  daisyui: {
    base: false,
    darkTheme: "light",
  }
}
