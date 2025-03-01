// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#28242C',
        'logo-blue': '#2074d4',
      }
    },
  },
  plugins: [],
};