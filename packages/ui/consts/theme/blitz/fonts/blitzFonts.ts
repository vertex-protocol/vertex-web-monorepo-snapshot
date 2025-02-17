import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Fonts } from '../../types';

export const TICKERBIT = localFont({
  src: [
    {
      path: './tickerbit-regular.woff2',
      style: 'normal',
    },
    {
      path: './tickerbit-italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-title',
});

const JETBRAINS_MONO = JetBrains_Mono({
  variable: '--font-default',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const BLITZ_FONTS = {
  title: TICKERBIT,
  default: JETBRAINS_MONO,
} satisfies Fonts;
