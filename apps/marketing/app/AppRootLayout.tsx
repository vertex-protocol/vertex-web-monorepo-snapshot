import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { interFont, radioGroteskFont } from 'client/utils/fonts';

export function AppRootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        'font-sans',
        'antialiased',
        interFont.variable,
        radioGroteskFont.variable,
        'scroll-smooth',
      )}
    >
      <body className="bg-dark overflow-x-clip">{children}</body>
    </html>
  );
}
