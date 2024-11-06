import defaultTheme from 'tailwindcss/defaultTheme';
import { BASE_TAILWIND_CONFIG } from '../baseTailwindConfig';
import { TailwindPreset } from '../types';
import { VERTEX_BOX_SHADOWS } from './vertexBoxShadows';
import { VERTEX_COLORS } from './vertexColors';

// We can't export this in `index.ts` as that seems to break things
export const VERTEX_TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: VERTEX_COLORS,
      boxShadow: VERTEX_BOX_SHADOWS,
      fontFamily: {
        default: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
        // Since we have a global class that uses this font for Blitz it needs to be defined here as well.
        title: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  presets: [BASE_TAILWIND_CONFIG],
} satisfies TailwindPreset;
