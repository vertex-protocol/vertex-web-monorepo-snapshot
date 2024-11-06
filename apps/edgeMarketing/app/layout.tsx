import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ClientLayout } from 'components/ClientLayout';
import { Providers } from 'components/Providers';
import { SEO_INFO } from 'config/seoInfo';
import { Metadata } from 'next';
import { sansFont } from 'utils/fonts';

import 'styles/globals.css';

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames('antialiased', sansFont.className)}
    >
      <body className="h-dvh min-h-dvh">
        <Providers>
          <ClientLayout>
            <AppSeoInfo />
            <main className="h-full">{children}</main>
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

/**
 * Tells Google what to show in search results.
 */
function AppSeoInfo() {
  return (
    <div className="absolute opacity-0">
      <h1>{SEO_INFO.title}</h1>
      <h2>{SEO_INFO.description}</h2>
    </div>
  );
}

export const metadata: Metadata = {
  // SEO
  title: SEO_INFO.title,
  manifest: '/site.webmanifest',
  description: SEO_INFO.description,
  icons: {
    icon: [
      '/favicon.ico',
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: {
      rel: 'mask-icon',
      type: 'image/svg+xml',
      sizes: 'any',
      url: '/safari-pinned-tab.svg',
    },
  },
  // OG Socials
  openGraph: {
    title: SEO_INFO.title,
    siteName: SEO_INFO.title,
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
  },
  twitter: {
    site: SEO_INFO.twitterProfile,
    title: SEO_INFO.title,
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
    card: 'summary_large_image',
  },
};
