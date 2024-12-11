/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js,html}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],  // Set the theme to light
  },
}

