import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Radio Grotesk font
export const radioGroteskFont = localFont({
  src: [
    {
      path: '../../public/fonts/pp-radio-grotesk-regular.woff2',
      style: 'normal',
    },
  ],
  variable: '--font-radio-grotesk',
});
