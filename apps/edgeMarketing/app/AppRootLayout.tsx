import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { sansFont } from 'utils/fonts';

export function AppRootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames('antialiased', sansFont.className)}
    >
      <body className="h-dvh min-h-dvh">{children}</body>
    </html>
  );
}
