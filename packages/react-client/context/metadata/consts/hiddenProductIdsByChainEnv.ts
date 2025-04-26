import { ChainEnv } from '@vertex-protocol/client';
import { VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import { DELISTED_PRODUCT_IDS } from './productDelisting';

export const HIDDEN_PRODUCT_IDS_BY_CHAIN_ENV: Record<ChainEnv, Set<number>> = {
  abstract: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  abstractTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  avax: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  avaxTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  arbitrum: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  arbitrumTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  base: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  baseTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  bera: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  beraTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  blast: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  blastTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  local: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  mantle: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  mantleTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  sei: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  seiTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  sonic: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
  sonicTestnet: new Set([...DELISTED_PRODUCT_IDS, VLP_PRODUCT_ID]),
};
