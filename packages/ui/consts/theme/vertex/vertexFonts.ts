import { DM_Sans, Inter } from 'next/font/google';

const DM_SANS = DM_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-title',
  subsets: ['latin'],
});

const INTER = Inter({
  variable: '--font-default',
  subsets: ['latin'],
});

export const VERTEX_FONTS = {
  title: DM_SANS,
  default: INTER,
};
