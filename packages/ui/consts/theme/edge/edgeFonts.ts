import { Inter } from 'next/font/google';

const INTER = Inter({
  variable: '--font-default',
  subsets: ['latin'],
});

export const EDGE_FONTS = {
  title: INTER,
  default: INTER,
};
