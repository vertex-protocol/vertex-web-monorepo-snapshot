import { WithChildren } from '@vertex-protocol/web-common';
import { AppRootLayout } from 'app/AppRootLayout';
import { ClientLayout } from 'components/ClientLayout';
import { LINKS } from 'config/links';
import { SEO_INFO } from 'config/seoInfo';
import { Metadata } from 'next';
import Image from 'next/image';
import backgroundImage from 'public/blitz/blitz-background.png';

import 'styles/globals.css';

const jsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: SEO_INFO.title,
  '@id': 'https://blitz.exchange/',
  url: 'https://blitz.exchange/',
  image: SEO_INFO.bannerImage,
  sameAs: [LINKS.x, LINKS.discord, LINKS.blog],
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <AppRootLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientLayout>
        <AppSeoInfo />
        <main className="relative h-dvh w-screen overflow-hidden">
          {/* Background image */}
          <Image
            src={backgroundImage}
            className="object-cover brightness-50"
            sizes="100vw"
            alt=""
            fill
          />
          {children}
        </main>
      </ClientLayout>
    </AppRootLayout>
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
    site: LINKS.x,
    title: SEO_INFO.title,
    description: SEO_INFO.description,
    images: SEO_INFO.bannerImage,
    card: 'summary_large_image',
  },
};
