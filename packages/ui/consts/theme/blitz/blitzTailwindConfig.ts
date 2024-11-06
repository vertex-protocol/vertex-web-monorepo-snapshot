import defaultTheme from 'tailwindcss/defaultTheme';
import { BASE_TAILWIND_CONFIG } from '../baseTailwindConfig';
import { TailwindPreset } from '../types';
import { BLITZ_BOX_SHADOWS } from './blitzBoxShadows';
import { BLITZ_COLORS } from './blitzColors';

// We can't export this in `index.ts` as that seems to break things
export const BLITZ_TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: BLITZ_COLORS,
      boxShadow: BLITZ_BOX_SHADOWS,
      fontFamily: {
        default: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
        title: ['var(--font-title)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  presets: [BASE_TAILWIND_CONFIG],
} satisfies TailwindPreset;
