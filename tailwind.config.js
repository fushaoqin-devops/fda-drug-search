module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin")],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
