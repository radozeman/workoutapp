module.exports = {
  purge: ["./src/**/*.vue"],
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [],
};
