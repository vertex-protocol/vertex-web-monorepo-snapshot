import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ThemeName } from '@vertex-protocol/web-ui';
import { getIsIframe } from 'client/utils/getIsIframe';
import { clientEnv } from 'common/environment/clientEnv';
import { FONTS } from 'common/theme/fonts';
import Script from 'next/script';

export function AppRootLayout({ children }: WithChildren) {
  const isBlitz = clientEnv.base.brandName === 'blitz';
  const isIframe = getIsIframe();
  const currentTheme: ThemeName = isBlitz ? 'blitzDark' : 'vertexDark';
  const isBlastPwaScriptEnabled = isBlitz && isIframe;

  return (
    <html
      lang="en"
      className={joinClassNames(
        FONTS.default.className,
        FONTS.default.variable,
        FONTS.title.variable,
        // Blitz fonts are very wide, so compress letter spacing
        isBlitz && 'tracking-tighter',
        // To achieve app-like overscroll behavior, we need to set `overscroll-none` on
        // both `html` for Chrome and `body` for Safari.
        'overscroll-none antialiased',
      )}
      data-theme={currentTheme}
    >
      <body className="bg-background text-text-secondary overscroll-none">
        {children}
        {/* Adds support for the Blast Mobile App. */}
        {isBlastPwaScriptEnabled && (
          <Script
            strategy="beforeInteractive"
            type="application/javascript"
            src="https://assets.blast.io/lib/pwa-sdk-1.0.1.umd.min.js"
          />
        )}
      </body>
    </html>
  );
}
