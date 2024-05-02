import { NextImageSrc } from '@vertex-protocol/web-common';
import { clientEnv } from 'common/environment/clientEnv';
import defaultPreview from '../preview/default.png';
import miladyPreview from '../preview/milady.png';
import pepePreview from '../preview/pepe.png';
import vertessieCandlestickPreview from '../preview/vertessie-candlestick.png';
import vertessieHonestPreview from '../preview/vertessie-honest.png';
import waifuPreview from '../preview/waifu.png';

export interface SocialSharingTheme {
  id: string;
  name: string;
  description: string;
  previewImageSrc: NextImageSrc;
  backgroundImageSrc: {
    positive: string;
    negative: string;
    zero: string;
  };
}

export const SOCIAL_SHARING_THEMES: SocialSharingTheme[] = {
  vertex: [
    {
      id: 'default',
      name: 'Default',
      description: '',
      previewImageSrc: defaultPreview,
      backgroundImageSrc: {
        positive: '/social_sharing/vertex/background/default.png',
        negative: '/social_sharing/vertex/background/default.png',
        zero: '/social_sharing/vertex/background/default.png',
      },
    },
    {
      id: 'vertessie_candlestick',
      name: 'Vertessie',
      description: 'Candlestick',
      previewImageSrc: vertessieCandlestickPreview,
      backgroundImageSrc: {
        positive:
          '/social_sharing/vertex/background/vertessie-candle-green.png',
        negative: '/social_sharing/vertex/background/vertessie-candle-red.png',
        zero: '/social_sharing/vertex/background/vertessie-candle-green.png',
      },
    },
    {
      id: 'vertessie_honest',
      name: 'Vertessie',
      description: 'Honest',
      previewImageSrc: vertessieHonestPreview,
      backgroundImageSrc: {
        positive:
          '/social_sharing/vertex/background/vertessie-honest-green.png',
        negative: '/social_sharing/vertex/background/vertessie-honest-red.png',
        zero: '/social_sharing/vertex/background/vertessie-honest-green.png',
      },
    },
    {
      id: 'waifu',
      name: 'Waifu',
      description: '',
      previewImageSrc: waifuPreview,
      backgroundImageSrc: {
        positive: '/social_sharing/vertex/background/waifu-green.png',
        negative: '/social_sharing/vertex/background/waifu-red.png',
        zero: '/social_sharing/vertex/background/waifu-green.png',
      },
    },
    {
      id: 'pepe',
      name: 'Pepe',
      description: '',
      previewImageSrc: pepePreview,
      backgroundImageSrc: {
        positive: '/social_sharing/vertex/background/pepe-green.png',
        negative: '/social_sharing/vertex/background/pepe-red.png',
        zero: '/social_sharing/vertex/background/pepe-green.png',
      },
    },
    {
      id: 'mi_lady',
      name: 'MiLady',
      description: '',
      previewImageSrc: miladyPreview,
      backgroundImageSrc: {
        positive: '/social_sharing/vertex/background/milady-green.png',
        negative: '/social_sharing/vertex/background/milady-red.png',
        zero: '/social_sharing/vertex/background/milady-green.png',
      },
    },
  ],
  blitz: [
    {
      id: 'default',
      name: 'Default',
      description: '',
      previewImageSrc: defaultPreview,
      backgroundImageSrc: {
        positive: '/social_sharing/blitz/background/default.png',
        negative: '/social_sharing/blitz/background/default.png',
        zero: '/social_sharing/blitz/background/default.png',
      },
    },
  ],
}[clientEnv.base.brandName];
