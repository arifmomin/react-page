import Search from './src/assets/Component/HomePage/HomeRightComponent/Search/Search';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        openSans:["Open Sans", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        commonColor: "#11175D",
        commonBackground: "#5F35F5",
      },
      dropShadow: {
        custom: '-2px 0px 4px rgba(0, 0, 0, 0.25)',
        SearchShadow: '0px 4px 3px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
