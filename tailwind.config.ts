import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        black: {
          light: "#434343",
          medium: "#202020",
          dark: "#181a1b"
        },
        red: "#ee3137",
        cyan: "#39c0f3",
        blue: "#000080",
        yellow: "#fde047",
        green: "#4ade80",
        gpt: {
          light: "#c3c3c3",
          medium: "#444654",
          dark: "#40414f",
          darker: "#343541"
        },
        retro: {
          light: "#d9d9d9",
          medium: "#c3c3c3",
          blue: "#000080"
        }
      },
      spacing: {
        view: "1080px"
      },
      height: {
        "min-screen": "100svh",
        "max-screen": "100lvh",
        screen: "100svh"
      }
    },
    screens: {
      desktop: "480px"
    },
    fontFamily: {
      sans: ["var(--font-roboto)"],
      mono: ["var(--font-roboto-mono)"]
    },
    fontSize: {
      base: "1.25rem",
      md: "1.75rem",
      lg: "4rem",
      xl: "6rem"
    },
    borderRadius: {
      lg: "16px",
      full: "100%"
    }
  },
  plugins: []
};
export default config;
