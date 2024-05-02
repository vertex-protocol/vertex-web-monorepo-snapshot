const defaultTheme = require('tailwindcss/defaultTheme');
const { COLORS } = require('./styles/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './client/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '875px',
      lg: '1200px',
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      fontSize: {
        '3xs': '.625rem',
        '2xs': '.6875rem',
        xs: '.75rem',
        sm: '.875rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.375rem',
        '3xl': '1.625rem',
        '4xl': '1.875rem',
        '5xl': '2.5rem',
        '6xl': '3.375rem',
      },
      colors: COLORS,
      fontFamily: {
        sans: ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-inter)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
