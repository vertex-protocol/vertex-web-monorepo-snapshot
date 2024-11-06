import { PrimaryChainID } from '@vertex-protocol/react-client';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'viem/chains';
import { USDC_ARB_ONE, USDC_ARB_SEPOLIA } from './arbitrum/tokens';
import { USDC_BASE, USDC_BASE_SEPOLIA } from './base/tokens';
import { USDB_BLAST, USDB_BLAST_SEPOLIA } from './blast/tokens';
import { USDC_HARDHAT } from './local/tokens';
import { USDC_MANTLE, USDC_MANTLE_SEPOLIA } from './mantle/tokens';
import { USDC_SEI, USDC_SEI_TESTNET } from './sei/tokens';
import { Token } from './types';

export const PRIMARY_QUOTE_TOKEN_BY_CHAIN: Record<number, Token> = {
  [arbitrum.id]: USDC_ARB_ONE,
  [arbitrumSepolia.id]: USDC_ARB_SEPOLIA,
  [base.id]: USDC_BASE,
  [baseSepolia.id]: USDC_BASE_SEPOLIA,
  [blast.id]: USDB_BLAST,
  [blastSepolia.id]: USDB_BLAST_SEPOLIA,
  [mantle.id]: USDC_MANTLE,
  [mantleSepoliaTestnet.id]: USDC_MANTLE_SEPOLIA,
  [seiTestnet.id]: USDC_SEI_TESTNET,
  [sei.id]: USDC_SEI,
  [hardhat.id]: USDC_HARDHAT,
  [localhost.id]: USDC_HARDHAT,
} satisfies Record<PrimaryChainID, Token>;
