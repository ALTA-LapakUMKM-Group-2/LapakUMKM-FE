/** @type {import('tailwindcss').Config} */
module.exports = {
  tailwindConfig: './styles/tailwind.config.js',
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: "class",
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
  plugins: [require("daisyui"), require('prettier-plugin-tailwindcss'),
            require("tailwindcss-radix")()],
  daisyui: {
    base: false,
    darkTheme: "light",
  }
}
