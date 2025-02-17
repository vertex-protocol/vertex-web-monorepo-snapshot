import { ChainEnv } from '@vertex-protocol/client';
import { USDC_ABSTRACT, USDC_ABSTRACT_TESTNET } from './abstract';
import { USDC_ARB_ONE, USDC_ARB_SEPOLIA } from './arbitrum/tokens';
import { USDC_BASE, USDC_BASE_SEPOLIA } from './base/tokens';
import { USDB_BLAST, USDB_BLAST_SEPOLIA } from './blast/tokens';
import { USDC_HARDHAT } from './local/tokens';
import { USDC_MANTLE, USDC_MANTLE_SEPOLIA } from './mantle/tokens';
import { USDC_SEI, USDC_SEI_TESTNET } from './sei/tokens';
import { USDC_SONIC, USDC_SONIC_TESTNET } from './sonic';
import { Token } from './types';

export const PRIMARY_QUOTE_TOKEN_BY_CHAIN_ENV: Record<ChainEnv, Token> = {
  arbitrum: USDC_ARB_ONE,
  arbitrumTestnet: USDC_ARB_SEPOLIA,
  base: USDC_BASE,
  baseTestnet: USDC_BASE_SEPOLIA,
  blast: USDB_BLAST,
  blastTestnet: USDB_BLAST_SEPOLIA,
  mantle: USDC_MANTLE,
  mantleTestnet: USDC_MANTLE_SEPOLIA,
  sei: USDC_SEI,
  seiTestnet: USDC_SEI_TESTNET,
  sonic: USDC_SONIC,
  sonicTestnet: USDC_SONIC_TESTNET,
  abstract: USDC_ABSTRACT,
  abstractTestnet: USDC_ABSTRACT_TESTNET,
  // Not used
  beraTestnet: USDC_HARDHAT,
  local: USDC_HARDHAT,
};
