module.exports = {
  mode: "jit",
  purge: [
    "_data/category_colours.yml",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_pages/**/*.html",
    "./*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        title: "Nunito",
        body: "Poppins",
      },
      colors: {
        yellow: {
          "900-1/2": "hsla(22, 78%, 26%, 0.5)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
