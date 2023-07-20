/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundColor: {
            primary: "#171820",
            secondary: "#1d1f29"
        },
        textColor: {
            primary: "#707070",
            hightlight: "#eee"
        },
        borderColor: {
            primary: "#83f0ff"
        }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
