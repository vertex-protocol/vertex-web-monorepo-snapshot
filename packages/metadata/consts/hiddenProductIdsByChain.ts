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

export const HIDDEN_PRODUCT_IDS_BY_CHAIN: Record<number, Set<number>> = {
  [arbitrum.id]: new Set(),
  [arbitrumSepolia.id]: new Set(),
  [base.id]: new Set(),
  [baseSepolia.id]: new Set(),
  [blast.id]: new Set(),
  [blastSepolia.id]: new Set(),
  [mantle.id]: new Set(),
  [mantleSepoliaTestnet.id]: new Set(),
  [sei.id]: new Set(),
  [seiTestnet.id]: new Set(),
  [hardhat.id]: new Set(),
  [localhost.id]: new Set(),
} satisfies Record<PrimaryChainID, Set<number>>;
