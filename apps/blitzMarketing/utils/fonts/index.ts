import { IBM_Plex_Mono, Pixelify_Sans } from 'next/font/google';

export const ibmMono = IBM_Plex_Mono({
  weight: ['300'],
  variable: '--font-ibm-mono',
  subsets: ['latin'],
});

export const pixelify = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
});
