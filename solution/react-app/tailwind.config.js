/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-rgba': 'rgba(147,147,147,0.38)',
        'blue-black' : '#020715',
        'corvette' : '#fbc994'
      }
    },
    fontFamily: {
      anonymousPro: ['Anonymous Pro', 'monospace'],
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}