import { ChainEnv } from '@vertex-protocol/client';
import { DELISTED_PRODUCT_IDS } from './productDelisting';

export const HIDDEN_PRODUCT_IDS_BY_CHAIN_ENV: Record<ChainEnv, Set<number>> = {
  arbitrum: new Set([...DELISTED_PRODUCT_IDS]),
  arbitrumTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  base: new Set([...DELISTED_PRODUCT_IDS]),
  baseTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  blast: new Set([...DELISTED_PRODUCT_IDS]),
  blastTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  mantle: new Set([...DELISTED_PRODUCT_IDS]),
  mantleTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  sei: new Set([...DELISTED_PRODUCT_IDS]),
  seiTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  sonicTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  sonic: new Set([...DELISTED_PRODUCT_IDS]),
  beraTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  abstractTestnet: new Set([...DELISTED_PRODUCT_IDS]),
  abstract: new Set([...DELISTED_PRODUCT_IDS]),
  local: new Set([...DELISTED_PRODUCT_IDS]),
};
