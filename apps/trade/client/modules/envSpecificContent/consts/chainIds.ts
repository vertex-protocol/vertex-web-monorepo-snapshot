import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'viem/chains';

export const ARB_CHAIN_IDS = [arbitrum.id, arbitrumSepolia.id];

export const MANTLE_CHAIN_IDS = [mantle.id, mantleSepoliaTestnet.id];

export const BASE_CHAIN_IDS = [base.id, baseSepolia.id];

export const BLAST_CHAIN_IDS = [blast.id, blastSepolia.id];

export const SEI_CHAIN_IDS = [sei.id, seiTestnet.id];
