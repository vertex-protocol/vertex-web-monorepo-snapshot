import { Inter } from 'next/font/google';
import { Fonts } from './types';

const INTER = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const EDGE_FONTS = {
  default: INTER,
  title: INTER,
} satisfies Fonts;
