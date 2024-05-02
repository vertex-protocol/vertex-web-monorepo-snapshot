import { PrimaryChainID } from '@vertex-protocol/web-data';
import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
} from 'wagmi/chains';

export const NEW_PRODUCT_IDS_BY_CHAIN: Record<number, Set<number>> = {
  [arbitrum.id]: new Set(),
  [arbitrumSepolia.id]: new Set(),
  [blastSepolia.id]: new Set(),
  [blast.id]: new Set(),
  [mantleSepoliaTestnet.id]: new Set(),
  [hardhat.id]: new Set(),
  [localhost.id]: new Set(),
} satisfies Record<PrimaryChainID, Set<number>>;
