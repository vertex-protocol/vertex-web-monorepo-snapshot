import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

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
  variable: '--font-radiogrotesk',
});
