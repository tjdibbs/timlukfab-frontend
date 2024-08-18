/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#ffcc00",
        "primary-low": "#997a00",
        secondary: "",
        "primary-dark": "#141106",
        "paper-low-dark": "#483a03",
      },
      fontFamily: {
        nunito: ["nunito", "sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
