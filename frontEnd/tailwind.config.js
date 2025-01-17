/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary1: "#87CEEB",
        primary2: "#FF6F61",
        secondary: "#FFD700",
        black: "#333333",
        white: "#F5F5F5",
      },
      fontFamily: {
        parkinsans: ["Parkinsans", "sans"],
        Sora: ["Sora", "serif"],
      },
      boxShadow: {
        custom: " inset 0px 0px 10px rgba(0,0,0,0.3)", // Define your custom shadow
      },
    },
  },
  plugins: [],
};
