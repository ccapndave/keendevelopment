const yaml = require("js-yaml");
const fs = require("fs");

const baseurl = (function () {
  const config = yaml.load(fs.readFileSync("./_config.yml", "utf8"));
  return config.baseurl === undefined ? "" : config.baseurl;
})();

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
    fontFamily: {
      sans: "Poppins",
    },
    extend: {
      backgroundImage: (theme) => ({
        code: `url('${baseurl}assets/images/Background.png')`,
      }),
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      lightgray: "#F4F4F4",
      darkgray: "#A1A1A1",
      orange: "#FF5F00",
      green: {
        50: "#ECFDF5",
        600: "#059669",
      },
      red: {
        50: "#FEF2F2",
        600: "#DC2626",
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
