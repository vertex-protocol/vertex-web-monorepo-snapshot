import { DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const ppObjectSans = localFont({
  src: [
    {
      path: './PPObjectSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PPObjectSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './PPObjectSans-Heavy.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pp-object-sans',
});
