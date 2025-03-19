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
          // ...require('daisyui/theme')['light'],
          primary: '#002d53',
          secondary: '#FF7D55',
          accent: '#E0E0E0',
          info: '#EEA71E',
        },
        dark: {
          // ...require('daisyui/theme')['dark'],
          primary: '#171717',
          secondary: '#FF7D55',
          accent: '#2A2A2A',
          'base-100': '#171717',
          'base-200': '#131314',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
