import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { TooltipPortalRoot, Z_INDEX } from '@vertex-protocol/web-ui';
import { ClientLayout } from 'app/ClientLayout';
import { AppBottomSheet } from 'client/modules/app/AppBottomSheet';
import { AppFooter } from 'client/modules/app/AppFooter';
import { AbstractLaunchPromoBanner } from 'client/modules/app/components/banners/AbstractLaunchPromoBanner/AbstractLaunchPromoBanner';
import { AbstractUpvoteDiscoverPromoBanner } from 'client/modules/app/components/banners/AbstractUpvoteDiscoverPromoBanner';
import { AppNavBar } from 'client/modules/app/navBar/AppNavBar';
import { BRAND_SEO_METADATA } from 'common/brandMetadata/seoInfo';
import { clientEnv } from 'common/environment/clientEnv';
import { FONTS } from 'common/theme/fonts';
import { Metadata, Viewport } from 'next';

export default function AppLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        FONTS.default.className,
        FONTS.default.variable,
        FONTS.title.variable,
        // Blitz fonts are very wide, so compress letter spacing
        clientEnv.base.brandName === 'blitz' && 'tracking-tighter',
        //To achieve app-like overscroll behavior, we need to set `overscroll-none` on
        //both `html` for Chrome and `body` for Safari.
        'overscroll-none antialiased',
      )}
    >
      <body
        className={joinClassNames(
          'flex h-svh flex-col',
          'bg-background text-text-secondary',
          'overflow-hidden overscroll-none',
        )}
      >
        <ClientLayout>
          <AbstractLaunchPromoBanner className="border-stroke border-b" />
          <AbstractUpvoteDiscoverPromoBanner className="border-stroke border-b" />
          <AppNavBar className={Z_INDEX.navbar} />
          <div
            // Hide horizontal overflow to ensure that tables never expand fully, but allow vertical scrolling
            className="no-scrollbar flex-1 overflow-x-hidden"
          >
            {children}
          </div>
          <AppFooter className="hidden lg:flex" />
          <AppBottomSheet />
        </ClientLayout>
        <TooltipPortalRoot />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  // SEO
  title: {
    default: BRAND_SEO_METADATA.title,
    template: `%s | ${clientEnv.brandMetadata.displayName}`,
  },
  description: BRAND_SEO_METADATA.description,
  manifest: BRAND_SEO_METADATA.siteManifest,
  icons: {
    apple: BRAND_SEO_METADATA.appleTouchIcon,
    icon: BRAND_SEO_METADATA.faviconSvg,
    other: [
      {
        url: BRAND_SEO_METADATA.faviconIco,
      },
      {
        rel: 'apple-touch-icon',
        url: BRAND_SEO_METADATA.appleTouchIcon,
      },
    ],
  },
  // OG Socials
  openGraph: {
    title: BRAND_SEO_METADATA.title,
    siteName: BRAND_SEO_METADATA.title,
    description: BRAND_SEO_METADATA.description,
    images: BRAND_SEO_METADATA.bannerImage,
  },
  // Twitter
  twitter: {
    site: BRAND_SEO_METADATA.xUsername,
    title: BRAND_SEO_METADATA.title,
    description: BRAND_SEO_METADATA.description,
    images: BRAND_SEO_METADATA.bannerImage,
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_SEO_METADATA.headerColor,
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
};
