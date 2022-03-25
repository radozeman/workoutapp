module.exports = {
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
