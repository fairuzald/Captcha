import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-black-soft": "#1C1A17",
        "app-black": "#000000",
        "app-red": "#EF1B27",
        "app-vermillion": "#FF2B06",
        "app-yellow": "#FECC4E",
        "app-gray": "#D7D2D0",
        "app-yellow-pale": "#FFDB80",
        "app-red-pale": "#F56870",
        "app-green": "#3FB160",
        "app-gold": "#FEB20E",
        "app-blue": "#046EE7",
        "app-purple": "#7B61FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
