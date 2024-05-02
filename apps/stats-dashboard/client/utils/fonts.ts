import { DM_Sans, Inter } from 'next/font/google';

export const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
});
export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
