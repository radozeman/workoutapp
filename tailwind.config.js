module.exports = {
  purge: ["./src/**/*.vue"],
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray1: "#8E8E93",
      gray2: "#636366",
      gray3: "#48484A",
      gray4: "#3A3A3C",
      gray5: "#2c2c2e",
      gray6: "#1C1C1E",
      white: "#ffffff",
      indigo: "#5e5ce6",
      orange: "#ff9d0a",
      red: "#ff443a",
      green: "#30d158",
    },
    extend: {
      minHeight: (theme) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [],
};
