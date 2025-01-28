/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary1: "#87CEEB",
        primary2: "#B0E2FF",
        primary3: "#ADD8E6",
        primary4: "#4682B4",
        primary5: "#4169E1",
        primary6: "#1E3A8A",
        secondary1: "#FFD700",
        secondary2: "#FFEC8B",
        secondary3: "#FFF68F",
        secondary4: "#FFB700",
        secondary5: "#FF8C00",
        secondary6: "#E68A00",
        black: "#333333",
        black1: "#1C1C1C",
        black2: "#262626",
        black3: "#404040",
        black4: "#595959",
        black5: "#707070",
        black6: "#808080",
        black7: "#A9A9A9",
        white: "#F5F5F5",
        white1: "#FFFFFF",
        white2: "#F8F8F8",
        white3: "#E8E8E8",
        white4: "#DCDCDC",
        white5: "#D3D3D3",
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
