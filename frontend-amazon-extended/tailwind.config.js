/** @type {import('tailwindcss').Config} */

import { red, transparent, white } from "tailwindcss/colors";

const colors = {
  transparent: transparent,
  black: "#2E3239",
  white: white,
  primary: "#FF9902",
  secondary: "#161D25",
  "bg-color": "#F2F2F5",
  aqua: "#268697",
  red: red[400],
  gray: "#CDCDCD",
};

export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  colors,
  extend: {
    keyframes: {
      animationOpacity: {
        from: { opacity: 0.2 },
        to: { opacity: 1 },
      },
      scaleIn: {
        "0%": {
          opacity: 0,
          transform: "scale(0.9)",
        },
        "50%": {
          opacity: 0.3,
        },
        "100%": {
          opacity: 1,
          transform: "scale(1)",
        },
      },
    },
    animation: {
      opacity: "animationOpacity .5s ease-in-out",
      scaleIn: "scaleIn .35s ease-in-out",
    },
  },
};
export const plugins = [];
