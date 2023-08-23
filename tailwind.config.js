/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bf0a30;",
        secondary: "#263238",
        tertiary: "#DCF1F0",
        white: "#FFFFFF",
        dark: "#263238",
        MODAL_BACKGROUND: "rgba(11, 12, 14, 0.77)",
      },
    },
  },
  plugins: [],
};
