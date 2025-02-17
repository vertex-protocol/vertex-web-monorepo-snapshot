import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { EDGE_FONTS, TooltipPortalRoot } from '@vertex-protocol/web-ui';
import { ClientLayout } from 'app/ClientLayout';
import { SEO_INFO } from 'client/config/seoInfo';
import { Metadata, Viewport } from 'next';
import backgroundImage from 'public/edge-background-image.png';
import Image from 'next/image';

// Style imports
import 'styles/globals.css';

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      className={joinClassNames(
        EDGE_FONTS.default.className,
        EDGE_FONTS.default.variable,
        EDGE_FONTS.title.variable,
        'overscroll-none antialiased',
      )}
    >
      <body className="bg-background text-text-secondary">
        <main
          className={joinClassNames(
            'h-dvh w-screen',
            'no-scrollbar overflow-auto',
          )}
        >
          <Image
            priority
            className="absolute right-0 top-0 -z-10 h-auto w-[640px]"
            src={backgroundImage}
            alt=""
          />
          <ClientLayout>
            <div
              className={joinClassNames(
                'mx-auto max-w-[1770px]',
                'flex flex-col gap-y-6',
                'px-4 sm:px-12',
                'py-6 lg:py-12',
              )}
            >
              {children}
            </div>
          </ClientLayout>
        </main>
        <TooltipPortalRoot />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  // SEO
  title: SEO_INFO.title,
  manifest: '/site.webmanifest',
  description: SEO_INFO.description,
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
  // Twitter
  twitter: {
    site: SEO_INFO.twitterProfile,
    title: SEO_INFO.title,
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: SEO_INFO.headerColor,
};
