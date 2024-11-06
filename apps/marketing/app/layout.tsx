import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { Providers } from 'client/components/Providers';
import { ClientLayout } from 'client/components/ClientLayout';
import { SEO_INFO } from 'client/seoInfo';
import { ppObjectSans, dmSans } from 'client/utils/fonts';
import { Metadata, Viewport } from 'next';
import 'styles/globals.css';

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        ppObjectSans.variable,
        dmSans.variable,
        'antialiased',
      )}
    >
      <body className="custom-scrollbar">
        <main>
          <Providers>
            <ClientLayout>
              <AppSeoInfo />
              {children}
            </ClientLayout>
          </Providers>
        </main>
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
  title: 'Vertex',
  description: SEO_INFO.description,
  manifest: '/site.webmanifest',
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
  openGraph: {
    title: SEO_INFO.title,
    siteName: SEO_INFO.title,
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
  },
  twitter: {
    title: SEO_INFO.title,
    site: '@vertex_protocol',
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e14',
};
