import { PrimaryChainID } from '@vertex-protocol/react-client';
import {
  ARB_ONE_PERP_METADATA_BY_PRODUCT_ID,
  ARB_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from './arbitrum/perpMetadataByProductId';
import {
  ARB_ONE_SPOT_METADATA_BY_PRODUCT_ID,
  ARB_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
} from './arbitrum/spotMetadataByProductId';
import {
  BASE_PERP_METADATA_BY_PRODUCT_ID,
  BASE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from './base/perpMetadataByProductId';
import {
  BASE_SPOT_METADATA_BY_PRODUCT_ID,
  BASE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
} from './base/spotMetadataByProductId';
import {
  BLAST_PERP_METADATA_BY_PRODUCT_ID,
  BLAST_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from './blast/perpMetadataByProductId';
import {
  BLAST_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  BLAST_SPOT_METADATA_BY_PRODUCT_ID,
} from './blast/spotMetadataByProductId';
import { HARDHAT_PERP_METADATA_BY_PRODUCT_ID } from './local/perpMetadataByProductId';
import { HARDHAT_SPOT_METADATA_BY_PRODUCT_ID } from './local/spotMetadataByProductId';
import {
  MANTLE_PERP_METADATA_BY_PRODUCT_ID,
  MANTLE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from './mantle/perpMetadataByProductId';
import {
  MANTLE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  MANTLE_SPOT_METADATA_BY_PRODUCT_ID,
} from './mantle/spotMetadataByProductId';
import { SEI_PERP_METADATA_BY_PRODUCT_ID } from './sei/perpMetadataByProductId';
import {
  SEI_SPOT_METADATA_BY_PRODUCT_ID,
  SEI_TESTNET_SPOT_METADATA_BY_PRODUCT_ID,
} from './sei/spotMetadataByProductId';
import { PerpProductMetadata, SpotProductMetadata } from './types';
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

export const SPOT_METADATA_BY_CHAIN: Record<
  number,
  Record<number, SpotProductMetadata>
> = {
  [arbitrum.id]: ARB_ONE_SPOT_METADATA_BY_PRODUCT_ID,
  [arbitrumSepolia.id]: ARB_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [base.id]: BASE_SPOT_METADATA_BY_PRODUCT_ID,
  [baseSepolia.id]: BASE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [blast.id]: BLAST_SPOT_METADATA_BY_PRODUCT_ID,
  [blastSepolia.id]: BLAST_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [mantle.id]: MANTLE_SPOT_METADATA_BY_PRODUCT_ID,
  [mantleSepoliaTestnet.id]: MANTLE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [sei.id]: SEI_SPOT_METADATA_BY_PRODUCT_ID,
  [seiTestnet.id]: SEI_TESTNET_SPOT_METADATA_BY_PRODUCT_ID,
  [hardhat.id]: HARDHAT_SPOT_METADATA_BY_PRODUCT_ID,
  [localhost.id]: HARDHAT_SPOT_METADATA_BY_PRODUCT_ID,
} satisfies Record<PrimaryChainID, Record<number, SpotProductMetadata>>;

export const PERP_METADATA_BY_CHAIN: Record<
  number,
  Record<number, PerpProductMetadata>
> = {
  [arbitrum.id]: ARB_ONE_PERP_METADATA_BY_PRODUCT_ID,
  [arbitrumSepolia.id]: ARB_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [base.id]: BASE_PERP_METADATA_BY_PRODUCT_ID,
  [baseSepolia.id]: BASE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [blast.id]: BLAST_PERP_METADATA_BY_PRODUCT_ID,
  [blastSepolia.id]: BLAST_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [mantle.id]: MANTLE_PERP_METADATA_BY_PRODUCT_ID,
  [mantleSepoliaTestnet.id]: MANTLE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [sei.id]: SEI_PERP_METADATA_BY_PRODUCT_ID,
  [seiTestnet.id]: SEI_PERP_METADATA_BY_PRODUCT_ID,
  [hardhat.id]: HARDHAT_PERP_METADATA_BY_PRODUCT_ID,
  [localhost.id]: HARDHAT_PERP_METADATA_BY_PRODUCT_ID,
} satisfies Record<PrimaryChainID, Record<number, PerpProductMetadata>>;
