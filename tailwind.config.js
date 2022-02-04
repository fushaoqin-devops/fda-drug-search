module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin")],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
