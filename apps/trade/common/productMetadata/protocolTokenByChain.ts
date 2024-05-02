import { PrimaryChainID } from '@vertex-protocol/web-data';
import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import {
  VRTX_ARB_ONE,
  VRTX_ARB_SEPOLIA,
} from 'common/productMetadata/arbitrum/tokens';
import {
  USDB_BLAST,
  USDB_BLAST_SEPOLIA,
} from 'common/productMetadata/blast/tokens';
import { VRTX_HARDHAT } from 'common/productMetadata/local/tokens';
import { USDC_MANTLE_SEPOLIA } from 'common/productMetadata/mantle/tokens';
import { Token } from 'common/productMetadata/types';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
} from 'wagmi/chains';

export const PROTOCOL_TOKEN_BY_CHAIN: Record<number, Token> = {
  [arbitrum.id]: VRTX_ARB_ONE,
  [arbitrumSepolia.id]: VRTX_ARB_SEPOLIA,
  // No protocol token on blast
  [blastSepolia.id]: USDB_BLAST_SEPOLIA,
  [blast.id]: USDB_BLAST,
  // No protocol token on mantle
  [mantleSepoliaTestnet.id]: USDC_MANTLE_SEPOLIA,
  [hardhat.id]: VRTX_HARDHAT,
  [localhost.id]: VRTX_HARDHAT,
} satisfies Record<PrimaryChainID, Token>;

export const PROTOCOL_TOKEN_PRODUCT_ID_BY_CHAIN: Record<number, number> = {
  [arbitrum.id]: 41,
  [arbitrumSepolia.id]: 41,
  // No protocol token on blast
  [blastSepolia.id]: -1,
  [blast.id]: -1,
  // No protocol token on mantle
  [mantleSepoliaTestnet.id]: -1,
  [hardhat.id]: 41,
  [localhost.id]: 41,
} satisfies Record<PrimaryChainID, number>;
