import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ibmMono, pixelify } from 'utils/fonts';

export function AppRootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        'antialiased',
        ibmMono.variable,
        pixelify.variable,
        pixelify.className,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
