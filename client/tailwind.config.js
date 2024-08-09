/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        co: {
          primary: "#162415",
        },
      },
    },
  },
  plugins: [],
};
