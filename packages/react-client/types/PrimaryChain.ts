import { sonic, sonicTestnet } from '@vertex-protocol/react-client';
import {
  abstract,
  abstractTestnet,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  berachainTestnet,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'wagmi/chains';

export const PRIMARY_CHAINS = [
  localhost,
  hardhat,
  arbitrum,
  arbitrumSepolia,
  blastSepolia,
  blast,
  mantleSepoliaTestnet,
  mantle,
  seiTestnet,
  sei,
  baseSepolia,
  base,
  sonicTestnet,
  sonic,
  berachainTestnet,
  abstractTestnet,
  abstract,
] as const;

export const PRIMARY_CHAIN_IDS = PRIMARY_CHAINS.map((chain) => chain.id);

export type PrimaryChain = (typeof PRIMARY_CHAINS)[number];

export type PrimaryChainID = PrimaryChain['id'];
