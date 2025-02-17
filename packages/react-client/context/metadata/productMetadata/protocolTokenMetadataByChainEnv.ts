import { ChainEnv } from '@vertex-protocol/client';
import { Chain } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
} from 'viem/chains';
import { VRTX_ARB_ONE, VRTX_ARB_SEPOLIA } from './arbitrum/tokens';
import { USDB_BLAST, USDB_BLAST_SEPOLIA } from './blast/tokens';
import { VRTX_HARDHAT } from './local/tokens';
import { Token } from './types';

export interface ProtocolTokenMetadata {
  /**
   * Token metadata
   */
  token: Token;
  /**
   * Product ID associated with the market
   */
  productId: number;
  /**
   * Chain associated with the protocol token (i.e. Arbitrum for VRTX)
   */
  chain: Chain;
  /**
   * ChainEnv associated with the protocol token
   */
  chainEnv: ChainEnv;
}

const VRTX_ARB_PROTOCOL_TOKEN_METADATA: ProtocolTokenMetadata = {
  token: VRTX_ARB_ONE,
  productId: 41,
  chain: arbitrum,
  chainEnv: 'arbitrum',
};

const VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA: ProtocolTokenMetadata = {
  token: VRTX_ARB_SEPOLIA,
  productId: 41,
  chain: arbitrumSepolia,
  chainEnv: 'arbitrumTestnet',
};

export const PROTOCOL_TOKEN_METADATA_BY_CHAIN_ENV: Record<
  ChainEnv,
  ProtocolTokenMetadata
> = {
  // Vertex mainnet
  arbitrum: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  base: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  mantle: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  sei: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  sonic: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  abstract: VRTX_ARB_PROTOCOL_TOKEN_METADATA,
  // Vertex testnet
  arbitrumTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  baseTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  mantleTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  seiTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  sonicTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  abstractTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  beraTestnet: VRTX_ARB_SEPOLIA_PROTOCOL_TOKEN_METADATA,
  // No protocol token on Blitz
  blast: {
    token: USDB_BLAST,
    productId: -1,
    chain: blast,
    chainEnv: 'blast',
  },
  blastTestnet: {
    token: USDB_BLAST_SEPOLIA,
    productId: -1,
    chain: blastSepolia,
    chainEnv: 'blastTestnet',
  },
  // Localhost
  local: {
    token: VRTX_HARDHAT,
    productId: 41,
    chain: hardhat,
    chainEnv: 'local',
  },
};
