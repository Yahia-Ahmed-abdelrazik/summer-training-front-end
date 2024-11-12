/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1F1F1F",
        secondary: "#545454",
        third: "#D1D1D1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add 'Inter' as the default sans font
      },
    },
  },
  plugins: [],
};
