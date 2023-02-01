/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundColor: {
            primary: "#141414",
            secondary: "#1C1C1C"
        },
        textColor: {
            primary: "#707070"
        },
        borderColor: {
            primary: "#707070"
        }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
