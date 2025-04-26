import { WithChildren } from '@vertex-protocol/web-common';
import { TooltipPortalRoot, Z_INDEX } from '@vertex-protocol/web-ui';
import { AppRootLayout } from 'app/AppRootLayout';
import { ClientLayout } from 'app/ClientLayout';
import { AppBottomSheet } from 'client/modules/app/AppBottomSheet';
import { AppFooter } from 'client/modules/app/AppFooter';
import { AppBanners } from 'client/modules/app/components/banners/AppBanners';
import { AppNavBar } from 'client/modules/app/navBar/AppNavBar';
import { BRAND_SEO_METADATA } from 'common/brandMetadata/seoInfo';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata, Viewport } from 'next';

// Style imports
import 'styles/globals.css';

export default function AppLayout({ children }: WithChildren) {
  return (
    <AppRootLayout>
      <ClientLayout>
        {/*This div is needed for the app to work with Funkit - they inject a global div as a child of the `body`, which messes with layout*/}
        <div className="flex h-svh flex-col overflow-hidden">
          <AppBanners />
          <AppNavBar className={Z_INDEX.navbar} />
          <div
            // Hide horizontal overflow to ensure that tables never expand fully, but allow vertical scrolling
            className="no-scrollbar flex-1 overflow-x-hidden"
          >
            {children}
          </div>
          <AppFooter className="hidden lg:flex" />
          <AppBottomSheet />
        </div>
      </ClientLayout>
      <TooltipPortalRoot />
    </AppRootLayout>
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
