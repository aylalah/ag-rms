/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#002d53',
          secondary: '#eea71e',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#002d53',
          secondary: '#eea71e',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
