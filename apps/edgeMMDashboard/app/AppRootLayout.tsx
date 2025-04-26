import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { VERTEX_FONTS } from '@vertex-protocol/web-ui';

export function AppRootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        VERTEX_FONTS.default.className,
        VERTEX_FONTS.default.variable,
        VERTEX_FONTS.title.variable,
        'antialiased',
      )}
      data-theme="vertexDark"
    >
      <body>{children}</body>
    </html>
  );
}
