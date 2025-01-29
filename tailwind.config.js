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
          width: "100%", 
          transform: "translateX(-5%)",
        },
      });
    },
  ],
};
