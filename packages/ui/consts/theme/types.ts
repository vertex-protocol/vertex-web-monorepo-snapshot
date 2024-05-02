import { Config } from 'tailwindcss';
import { BLITZ_BOX_SHADOWS, BLITZ_COLORS, BLITZ_FONTS } from './blitz';
import { VERTEX_BOX_SHADOWS, VERTEX_COLORS, VERTEX_FONTS } from './vertex';

export type BoxShadows = typeof BLITZ_BOX_SHADOWS | typeof VERTEX_BOX_SHADOWS;

export type Colors = typeof VERTEX_COLORS | typeof BLITZ_COLORS;

// Next.js doesn't seem to export font types, so we have to use `unknown` here and use `satisfies` in consumers
export type Fonts = typeof VERTEX_FONTS | typeof BLITZ_FONTS;

export type TailwindPreset = Omit<Config, 'content'>;
