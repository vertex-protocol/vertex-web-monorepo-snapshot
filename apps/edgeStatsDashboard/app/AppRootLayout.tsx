import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { EDGE_FONTS } from '@vertex-protocol/web-ui';

export function AppRootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        EDGE_FONTS.default.className,
        EDGE_FONTS.default.variable,
        EDGE_FONTS.title.variable,
        'overscroll-none antialiased',
      )}
      data-theme="edgeLight"
    >
      <body className="bg-background text-text-secondary">{children}</body>
    </html>
  );
}
