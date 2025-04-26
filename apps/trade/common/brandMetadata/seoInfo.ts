import { clientEnv } from 'common/environment/clientEnv';
import { BrandName } from 'common/environment/types';

interface BrandSeoMetadata {
  title: string;
  description: string;
  bannerImage: string;
  siteManifest: string;
  faviconIco: string;
  faviconSvg: string;
  appleTouchIcon: string;
  tileColor: string;
  headerColor: string;
  xUsername: string;
}

const BRAND_SEO_METADATA_BY_BRAND_NAME: Record<BrandName, BrandSeoMetadata> = {
  vertex: {
    title: 'Vertex | Trade Crypto with an Edge',
    description:
      'Traders choose Vertex for decentralized spot and perpetual cryptocurrency trading with the fastest speeds, lowest fees, and deep liquidity. Trade spot and perp crypto markets across multiple blockchains including Arbitrum, Base, and Sei.',
    bannerImage: 'https://vertexprotocol.com/img/twitter-preview-banner.png',
    siteManifest: '/vertex-site.webmanifest',
    faviconIco: '/vertex-favicon.ico',
    faviconSvg: '/vertex-icon.svg',
    appleTouchIcon: '/vertex-apple-touch-icon.png',
    tileColor: '#8041E5',
    headerColor: '#000000',
    xUsername: '@vertex_protocol',
  },
  blitz: {
    title: 'Blitz | Trade Crypto with an Edge',
    description:
      'Blazing fast orderbook DEX for spot and futures trading on Blast. Connected by Vertex Edge.',
    bannerImage: 'https://blitz.exchange/img/twitter-preview-banner.png',
    siteManifest: '/blitz-site.webmanifest',
    faviconIco: '/blitz-favicon.ico',
    faviconSvg: '/blitz-icon.svg',
    appleTouchIcon: '/blitz-apple-touch-icon.png',
    tileColor: '#FF036D',
    headerColor: '#07070A',
    xUsername: '@tradeonblitz',
  },
};

export const BRAND_SEO_METADATA =
  BRAND_SEO_METADATA_BY_BRAND_NAME[clientEnv.base.brandName];
