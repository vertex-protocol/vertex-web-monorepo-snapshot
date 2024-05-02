import defaultTheme from 'tailwindcss/defaultTheme';
import { TailwindPreset } from './types';

export const BASE_TAILWIND_CONFIG = {
  theme: {
    screens: {
      sm: '875px',
      lg: '1200px',
    },
    extend: {
      keyframes: {
        'horizontally-shrink': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'toast-timer': 'horizontally-shrink linear forwards',
      },
      fontFamily: {
        default: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
        title: ['var(--font-title)', ...defaultTheme.fontFamily.mono],
      },
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
    },
  },
  plugins: [],
} satisfies TailwindPreset;
