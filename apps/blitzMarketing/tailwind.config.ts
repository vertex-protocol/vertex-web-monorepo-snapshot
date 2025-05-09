// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { COLORS } from './styles/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      sm: '.813rem',
      md: '.938rem',
      base: '1.063rem',
      lg: '1.25rem',
      xl: '1.375rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
    },
    extend: {
      backgroundImage: {
        button: 'linear-gradient(90deg, #FF036D 0%, #930161 100%)',
      },
      fontFamily: {
        ibm: ['var(--font-ibm-mono)', 'monospace'],
        pixelify: ['Pixelify Sans', 'sans-serif'],
      },
      lineHeight: {
        snug: '21px',
      },
      colors: COLORS,
      screens: {
        sm: '640px',
        md: '830px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',
      },
    },
  },
};
