// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { COLORS } from './styles/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tile-link':
          'radial-gradient(82.2% 82.2% at 50% 0%, #ECECEC 0%, #FFF 100%)',
        'tile-link-border':
          'radial-gradient(82.2% 82.2% at 50% 100%, #ECECEC 50%, #FFF 100%)',
      },
      boxShadow: {
        'tile-link':
          '0px 0px 0px 1px rgba(224, 237, 224, 0.50), 0px 4px 4px 0px rgba(0, 0, 0, 0.12)',
        'tile-link-hover':
          '0px 0px 0px 1px rgba(224, 237, 224, 0), 0px 4px 4px 0px rgba(0, 0, 0, 0)',
      },
      fontSize: {
        sm: '.813rem',
        md: '.938rem',
        base: '1.063rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.75rem',
        '3xl': '2.25rem',
      },
      lineHeight: {
        tight: '1.3',
        snug: '1.4',
      },
      colors: COLORS,
      screens: {
        sm: '640px',
        md: '830px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',
      },
      zIndex: {
        1: 1,
      },
    },
  },
};
