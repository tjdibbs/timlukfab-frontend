import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      colors: {
        primary: "#CD0001",
        dark_grey: "#555555",
        normal_grey: "#777777",
        dark_blue: "#446084",
      },
      fontFamily: {
        nunito: ["nunito", "sans", "sans-serif"],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config


// import type { Config } from "tailwindcss";

// import tailwindcss_animate from "tailwindcss-animate";

// const config: Config = {
//   important: true,
//   darkMode: "class",
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         sm: "480px",
//         md: "768px",
//         lg: "976px",
//         xl: "1440px",
//       },
//       colors: {
//         primary: "#CD0001"
//       },
//       fontFamily: {
//         nunito: ["nunito", "sans", "sans-serif"],
//       },
//     },
//   },

//   plugins: [tailwindcss_animate],
// };

// export default config