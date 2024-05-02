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
    },
  },
  presets: [BASE_TAILWIND_CONFIG],
} satisfies TailwindPreset;
