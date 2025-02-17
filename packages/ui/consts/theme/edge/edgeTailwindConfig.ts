import defaultTheme from 'tailwindcss/defaultTheme';
import { BASE_TAILWIND_CONFIG } from '../baseTailwindConfig';
import { TailwindPreset } from '../types';
import { EDGE_BOX_SHADOWS } from './edgeBoxShadows';
import { EDGE_COLORS } from './edgeColors';

// We can't export this in `index.ts` as that seems to break things
export const EDGE_TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: EDGE_COLORS,
      boxShadow: EDGE_BOX_SHADOWS,
      fontFamily: {
        default: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
        title: ['var(--font-default)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  presets: [BASE_TAILWIND_CONFIG],
} satisfies TailwindPreset;
