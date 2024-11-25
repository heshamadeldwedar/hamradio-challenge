/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/src/assets/images/space_background.svg')",
      },
    },
  },
};
