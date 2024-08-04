/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-white": "linear-gradient(to right, transparent, white)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins font here
      },
    },
  },
  plugins: [],
};
