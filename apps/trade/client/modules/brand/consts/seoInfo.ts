import { BrandName } from '@vertex-protocol/web-ui';
import { clientEnv } from 'common/environment/clientEnv';

interface BrandSeoMetadata {
  title: string;
  description: string;
  bannerImage: string;
  favicon: string;
  appleTouchIcon: string;
  favicon32x32: string;
  favicon16x16: string;
  safariPinnedTab: string;
  tileColor: string;
  headerColor: string;
}

const BRAND_SEO_METADATA_BY_BRAND_NAME: Record<BrandName, BrandSeoMetadata> = {
  vertex: {
    title: 'Vertex | A Leading Exchange for Spot & Perpetuals Trading',
    description:
      'An all-in-one DEX on Arbitrum. Trade, earn & borrow, powered by a turbo-charged trading engine to outperform the competition. Trade on Vertex and earn $VRTX.',
    bannerImage: 'https://vertexprotocol.com/img/twitter-preview-banner.png',
    favicon: '/vertex-favicon.ico',
    appleTouchIcon: '/vertex-apple-touch-icon.png',
    favicon32x32: '/vertex-favicon-32x32.png',
    favicon16x16: '/vertex-favicon-16x16.png',
    safariPinnedTab: '/vertex-safari-pinned-tab.svg',
    tileColor: '#8041E5',
    headerColor: '#101016',
  },
  blitz: {
    title: 'Blitz | A Leading Exchange for Spot & Perpetuals Trading',
    description:
      'Blazing fast orderbook DEX for spot and futures trading on Blast. Connected by Vertex Edge.',
    bannerImage: 'https://blitz.exchange/img/twitter-preview-banner.png',
    favicon: '/blitz-favicon.ico',
    appleTouchIcon: '/blitz-apple-touch-icon.png',
    favicon32x32: '/blitz-favicon-32x32.png',
    favicon16x16: '/blitz-favicon-16x16.png',
    safariPinnedTab: '/blitz-safari-pinned-tab.svg',
    tileColor: '#FF036D',
    headerColor: '#07070A',
  },
};

export const BRAND_SEO_METADATA =
  BRAND_SEO_METADATA_BY_BRAND_NAME[clientEnv.base.brandName];
