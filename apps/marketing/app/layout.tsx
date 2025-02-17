import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { ClientLayout } from 'client/components/ClientLayout/ClientLayout';
import { CookieNoticeBanner } from 'client/components/CookieNoticeBanner/CookieNoticeBanner';
import { Navigation } from 'client/components/Navigation/Navigation';
import { Footer } from 'client/sections/Footer/Footer';
import { interFont, radioGroteskFont } from 'client/utils/fonts';
import { Metadata, Viewport } from 'next';

import 'styles/globals.css';

export default function RootLayout({ children }: WithChildren) {
  return (
    <html
      lang="en"
      className={joinClassNames(
        'font-sans',
        'antialiased',
        interFont.variable,
        radioGroteskFont.variable,
        'scroll-smooth',
      )}
    >
      <body className="bg-dark overflow-x-clip">
        <ClientLayout>
          <AppSeoInfo />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CookieNoticeBanner />
        </ClientLayout>
      </body>
    </html>
  );
}

const SEO_INFO = {
  title: 'Vertex | Trade Crypto with an Edge',
  description:
    'Traders choose Vertex for decentralized spot and perpetual cryptocurrency trading with the fastest speeds, lowest fees, and deep liquidity. Trade spot and perp crypto markets across multiple blockchains including Arbitrum, Base, and Sei.',
};

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
  title: SEO_INFO.title,
  description: SEO_INFO.description,
  keywords: [
    'trading',
    'cryptocurrency',
    'bitcoin',
    'ethereum',
    'perpetuals',
    'perps',
    'spot',
    'futures',
    'options',
    'derivatives',
    'decentralized',
    'vrtx',
    'usdc',
    'arb',
    'wbtc',
    'eth',
    'btc',
    'usdt',
    'token',
    'edge',
    'arbitrum',
    'base',
    'mantle',
    'solana',
    'sei',
    'orderbook',
    'rewards',
    'buy',
    'sell',
    'lend',
    'borrow',
    'earn',
    'defi',
    'low fee',
    'staking',
    'tokenomics',
    'margin',
    'leverage',
    'ecosystem',
    'finance',
    'secure',
    'multichain',
    'apy',
    'apr',
    'meme-coin',
    'memecoins',
    'vault',
  ],
  authors: [{ name: 'Vertex Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SEO_INFO.title,
    description: SEO_INFO.description,
    url: 'https://www.vertexprotocol.com',
    siteName: 'Vertex',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://vertexprotocol.com/img/twitter-preview-banner.png',
        width: 1200,
        height: 630,
        alt: 'Vertex Protocol',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_INFO.title,
    description: SEO_INFO.description,
    creator: '@vertex_protocol',
    images: [
      {
        url: 'https://vertexprotocol.com/img/twitter-preview-banner.png',
        width: 1200,
        height: 630,
        alt: 'Vertex Protocol',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0C',
};
