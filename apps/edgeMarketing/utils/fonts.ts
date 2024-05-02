import localFont from 'next/font/local';

export const sansFont = localFont({
  src: [
    {
      path: '../public/fonts/pp-radio-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
