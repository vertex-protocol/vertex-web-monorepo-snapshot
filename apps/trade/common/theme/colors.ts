import {
  BLITZ_COLORS,
  BrandName,
  Colors,
  VERTEX_COLORS,
} from '@vertex-protocol/web-ui';
import { baseClientEnv } from 'common/environment/baseClientEnv';

const COLORS_BY_BRAND_NAME: Record<BrandName, Colors> = {
  vertex: VERTEX_COLORS,
  blitz: BLITZ_COLORS,
};

export const COLORS = COLORS_BY_BRAND_NAME[baseClientEnv.brandName];
