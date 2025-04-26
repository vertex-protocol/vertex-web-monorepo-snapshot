import { ChainEnv } from '@vertex-protocol/client';
import { KNOWN_PRODUCT_IDS } from '../productMetadata/knownProductIds';

export const NEW_PRODUCT_IDS_BY_CHAIN_ENV: Record<ChainEnv, Set<number>> = {
  abstract: new Set([]),
  abstractTestnet: new Set([]),
  arbitrum: new Set([]),
  arbitrumTestnet: new Set([]),
  avax: new Set([KNOWN_PRODUCT_IDS.wavax]),
  avaxTestnet: new Set([KNOWN_PRODUCT_IDS.wavax]),
  base: new Set([]),
  baseTestnet: new Set([]),
  bera: new Set([]),
  beraTestnet: new Set([]),
  blast: new Set([]),
  blastTestnet: new Set([]),
  local: new Set(),
  mantle: new Set([]),
  mantleTestnet: new Set([]),
  sei: new Set([]),
  seiTestnet: new Set([]),
  sonic: new Set([]),
  sonicTestnet: new Set([]),
};
