/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    function ({ addUtilities }) {
      addUtilities({
        ".hr-full": {
          width: "99vw", 
          transform: "translateX(-5%)", // Đảm bảo hr canh giữa trên màn hình
        },
      });
    },
  ],
};
