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

export const NEW_PRODUCT_IDS_BY_CHAIN: Record<number, Set<number>> = {
  [arbitrum.id]: new Set([138, 140, 142, 144]),
  [arbitrumSepolia.id]: new Set([138, 140, 142, 144]),
  [base.id]: new Set([138, 140, 142, 144]),
  [baseSepolia.id]: new Set([138, 140, 142, 144]),
  [blast.id]: new Set([138, 140, 142, 144]),
  [blastSepolia.id]: new Set([138, 140, 142, 144]),
  [mantle.id]: new Set([138, 140, 142, 144]),
  [mantleSepoliaTestnet.id]: new Set([138, 140, 142, 144]),
  [sei.id]: new Set([138, 140, 142, 144]),
  [seiTestnet.id]: new Set([138, 140, 142, 144]),
  [hardhat.id]: new Set(),
  [localhost.id]: new Set(),
} satisfies Record<PrimaryChainID, Set<number>>;
