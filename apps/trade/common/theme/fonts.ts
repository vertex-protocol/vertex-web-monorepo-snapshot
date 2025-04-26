import { BLITZ_FONTS, Fonts, VERTEX_FONTS } from '@vertex-protocol/web-ui';
import { baseClientEnv } from 'common/environment/baseClientEnv';
import { BrandName } from 'common/environment/types';

const FONTS_BY_BRAND_NAME = {
  vertex: VERTEX_FONTS,
  blitz: BLITZ_FONTS,
} satisfies Record<BrandName, Fonts>;

export const FONTS = FONTS_BY_BRAND_NAME[baseClientEnv.brandName];
