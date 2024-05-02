import { IBM_Plex_Mono } from 'next/font/google';

/** @todo needs to add Pixelify Font after update next/font/google package */

export const ibmMono = IBM_Plex_Mono({
  weight: ['300'],
  variable: '--font-ibm-mono',
  subsets: ['latin'],
});
