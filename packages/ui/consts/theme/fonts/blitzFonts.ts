import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Fonts } from './types';

export const TICKERBIT = localFont({
  src: [
    {
      path: './assets/tickerbit-regular.woff2',
      style: 'normal',
    },
    {
      path: './assets/tickerbit-italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-tickerbit',
});

const JETBRAINS_MONO = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const BLITZ_FONTS = {
  default: JETBRAINS_MONO,
  title: TICKERBIT,
} satisfies Fonts;
