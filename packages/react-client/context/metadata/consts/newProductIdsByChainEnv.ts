import { ChainEnv } from '@vertex-protocol/client';

export const NEW_PRODUCT_IDS_BY_CHAIN_ENV: Record<ChainEnv, Set<number>> = {
  arbitrum: new Set([152]),
  arbitrumTestnet: new Set([152]),
  base: new Set([152]),
  baseTestnet: new Set([152]),
  blast: new Set([152]),
  blastTestnet: new Set([152]),
  mantle: new Set([152]),
  mantleTestnet: new Set([152]),
  sei: new Set([152]),
  seiTestnet: new Set([152]),
  sonicTestnet: new Set([152]),
  sonic: new Set([152]),
  beraTestnet: new Set([152]),
  abstractTestnet: new Set([152]),
  abstract: new Set([152]),
  local: new Set(),
};
