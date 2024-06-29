import { ChainEnv } from '@vertex-protocol/client';
import { PrimaryChainID } from '@vertex-protocol/react-client';
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
import {
  USDC_MANTLE,
  USDC_MANTLE_SEPOLIA,
} from 'common/productMetadata/mantle/tokens';
import { Token } from 'common/productMetadata/types';
import { Chain } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
} from 'wagmi/chains';

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

export const PROTOCOL_TOKEN_METADATA_BY_CHAIN: Record<
  number,
  ProtocolTokenMetadata
> = {
  // Vertex mainnet
  [arbitrum.id]: {
    token: VRTX_ARB_ONE,
    productId: 41,
    chain: arbitrum,
    chainEnv: 'arbitrum',
  },
  [mantle.id]: {
    token: VRTX_ARB_ONE,
    productId: 41,
    chain: arbitrum,
    chainEnv: 'arbitrum',
  },
  // Vertex testnet
  [arbitrumSepolia.id]: {
    token: VRTX_ARB_SEPOLIA,
    productId: 41,
    chain: arbitrumSepolia,
    chainEnv: 'arbitrumTestnet',
  },
  [mantleSepoliaTestnet.id]: {
    token: VRTX_ARB_SEPOLIA,
    productId: 41,
    chain: arbitrumSepolia,
    chainEnv: 'arbitrumTestnet',
  },
  // No protocol token on Blitz
  [blast.id]: {
    token: USDB_BLAST,
    productId: -1,
    chain: blast,
    chainEnv: 'blast',
  },
  [blastSepolia.id]: {
    token: USDB_BLAST_SEPOLIA,
    productId: -1,
    chain: blastSepolia,
    chainEnv: 'blastTestnet',
  },
  // Localhost
  [hardhat.id]: {
    token: VRTX_HARDHAT,
    productId: 41,
    chain: hardhat,
    chainEnv: 'local',
  },
  [localhost.id]: {
    token: VRTX_HARDHAT,
    productId: 41,
    chain: localhost,
    chainEnv: 'local',
  },
} satisfies Record<PrimaryChainID, ProtocolTokenMetadata>;
