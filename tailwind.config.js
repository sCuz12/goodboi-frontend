const colors = require("tailwindcss/colors");

// Hex To RGB
const hexToRGB = (h) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 Digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 6igits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return +r + " " + +g + " " + +b;
};

// With Opacity Value
const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: {
        50: withOpacityValue("--color-gray-50"),
        100: withOpacityValue("--color-gray-100"),
        200: withOpacityValue("--color-gray-200"),
        300: withOpacityValue("--color-gray-300"),
        400: withOpacityValue("--color-gray-400"),
        500: withOpacityValue("--color-gray-500"),
        600: withOpacityValue("--color-gray-600"),
        700: withOpacityValue("--color-gray-700"),
        800: withOpacityValue("--color-gray-800"),
        900: withOpacityValue("--color-gray-900"),
      },
      primary: {
        DEFAULT: withOpacityValue("--color-primary"),
        50: withOpacityValue("--color-primary-50"),
        100: withOpacityValue("--color-primary-100"),
        200: withOpacityValue("--color-primary-200"),
        300: withOpacityValue("--color-primary-300"),
        400: withOpacityValue("--color-primary-400"),
        500: withOpacityValue("--color-primary-500"),
        600: withOpacityValue("--color-primary-600"),
        700: withOpacityValue("--color-primary-700"),
        800: withOpacityValue("--color-primary-800"),
        900: withOpacityValue("--color-primary-900"),
      },
      secondary: withOpacityValue("--color-secondary"),
    },
    extend: {
      colors: {
        roz: "#fbe2ce",
        grizo: "#3D434B",
        basicFont: "#32263e",
        navyPink: "#ffe1cb",
        basicPurple: "#6637c5",
        darkPink: "#e6669a",
        blue: "#77c0e0",
        darkPurple: "#251B2F",
        lightPink: "#dc4b87",
        lightBlue: "#67B3D8",
        lightGray: "#E0E0E0",
        red: "#ff0000",
      },
      height: {
        120: "36rem",
        100: "28rem",
      },
      backgroundColor: {
        background: withOpacityValue("--color-background"),
        foreground: withOpacityValue("--color-foreground"),
        input: withOpacityValue("--color-input"),
      },
      borderColor: {
        divider: withOpacityValue("--color-divider"),
        border: withOpacityValue("--color-border"),
      },
      fontFamily: {
        kdam: ["Kdam Thmor Pro"],
        luckiest: ["Luckiest Guy"],
        cherryBomb: ["Cherry Bomb"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    // ...
  ],
  variants: {
    extend: {
      opacity: ["disabled"],
    },

    fontFamily: {
      monospace: ["Monospace", "ui-monospace"],
    },
  },
};
