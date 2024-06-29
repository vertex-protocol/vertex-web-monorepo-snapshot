import { PrimaryChainID } from '@vertex-protocol/react-client';
import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
} from 'wagmi/chains';

export const HIDDEN_PRODUCT_IDS_BY_CHAIN: Record<number, Set<number>> = {
  [arbitrum.id]: new Set(),
  [arbitrumSepolia.id]: new Set(),
  [blast.id]: new Set(),
  [blastSepolia.id]: new Set(),
  [mantle.id]: new Set(),
  [mantleSepoliaTestnet.id]: new Set(),
  [hardhat.id]: new Set(),
  [localhost.id]: new Set(),
} satisfies Record<PrimaryChainID, Set<number>>;
