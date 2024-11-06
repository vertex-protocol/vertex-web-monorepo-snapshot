import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { TooltipPortalRoot, VERTEX_FONTS } from '@vertex-protocol/web-ui';
import { ClientLayout } from 'app/ClientLayout';
import { NavBar } from 'client/components/NavBar/NavBar';
import { SEO_INFO } from 'client/consts/seoInfo';
import { Metadata } from 'next';

// Style imports
import 'styles/globals.css';

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      className={joinClassNames(
        VERTEX_FONTS.default.className,
        VERTEX_FONTS.default.variable,
        VERTEX_FONTS.title.variable,
        'antialiased',
      )}
    >
      <body className="flex h-svh w-screen flex-col">
        <ClientLayout>
          <NavBar />
          <main className="no-scrollbar flex-1 overflow-y-auto">
            <div
              className={joinClassNames(
                'mx-auto min-h-full max-w-[1770px]',
                'flex flex-col gap-y-4 lg:gap-y-6',
                'px-4 sm:px-12',
                'py-4 lg:py-8',
              )}
            >
              {children}
            </div>
          </main>
        </ClientLayout>
        <TooltipPortalRoot />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  // SEO
  title: {
    default: SEO_INFO.title,
    template: `%s | ${SEO_INFO.title}`,
  },
  manifest: '/site.webmanifest',
  icons: {
    apple: SEO_INFO.appleTouchIcon,
    icon: SEO_INFO.favicon16x16,
    shortcut: SEO_INFO.favicon32x32,
    other: [
      //Favicon
      {
        url: SEO_INFO.favicon,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: SEO_INFO.favicon32x32,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: SEO_INFO.favicon16x16,
      },
      // Apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: SEO_INFO.appleTouchIcon,
      },
      {
        rel: 'mask-icon',
        url: SEO_INFO.safariPinnedTab,
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  },
};
