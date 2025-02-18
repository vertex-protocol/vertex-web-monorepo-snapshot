import { ChainEnv } from '@vertex-protocol/client';
import { USDC_ABSTRACT, USDC_ABSTRACT_TESTNET } from './abstract';
import { USDC_ARB_ONE, USDC_ARB_SEPOLIA } from './arbitrum';
import { USDC_BASE, USDC_BASE_SEPOLIA } from './base';
import { HONEY_BERACHAIN, HONEY_BERACHAIN_TESTNET } from './berachain';
import { USDB_BLAST, USDB_BLAST_SEPOLIA } from './blast';
import { USDC_HARDHAT } from './local';
import { USDC_MANTLE, USDC_MANTLE_SEPOLIA } from './mantle';
import { USDC_SEI, USDC_SEI_TESTNET } from './sei';
import { USDC_SONIC, USDC_SONIC_TESTNET } from './sonic';
import { Token } from './types';

export const PRIMARY_QUOTE_TOKEN_BY_CHAIN_ENV: Record<ChainEnv, Token> = {
  abstract: USDC_ABSTRACT,
  abstractTestnet: USDC_ABSTRACT_TESTNET,
  arbitrum: USDC_ARB_ONE,
  arbitrumTestnet: USDC_ARB_SEPOLIA,
  base: USDC_BASE,
  baseTestnet: USDC_BASE_SEPOLIA,
  bera: HONEY_BERACHAIN,
  beraTestnet: HONEY_BERACHAIN_TESTNET,
  blast: USDB_BLAST,
  blastTestnet: USDB_BLAST_SEPOLIA,
  local: USDC_HARDHAT,
  mantle: USDC_MANTLE,
  mantleTestnet: USDC_MANTLE_SEPOLIA,
  sei: USDC_SEI,
  seiTestnet: USDC_SEI_TESTNET,
  sonic: USDC_SONIC,
  sonicTestnet: USDC_SONIC_TESTNET,
};
