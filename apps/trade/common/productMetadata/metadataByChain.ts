import { PrimaryChainID } from '@vertex-protocol/web-data';
import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import {
  ARB_ONE_PERP_METADATA_BY_PRODUCT_ID,
  ARB_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from 'common/productMetadata/arbitrum/perpMetadataByProductId';
import {
  ARB_ONE_SPOT_METADATA_BY_PRODUCT_ID,
  ARB_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
} from 'common/productMetadata/arbitrum/spotMetadataByProductId';
import {
  BLAST_PERP_METADATA_BY_PRODUCT_ID,
  BLAST_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
} from 'common/productMetadata/blast/perpMetadataByProductId';
import {
  BLAST_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  BLAST_SPOT_METADATA_BY_PRODUCT_ID,
} from 'common/productMetadata/blast/spotMetadataByProductId';
import { HARDHAT_PERP_METADATA_BY_PRODUCT_ID } from 'common/productMetadata/local/perpMetadataByProductId';
import { HARDHAT_SPOT_METADATA_BY_PRODUCT_ID } from 'common/productMetadata/local/spotMetadataByProductId';
import { MANTLE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID } from 'common/productMetadata/mantle/perpMetadataByProductId';
import { MANTLE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID } from 'common/productMetadata/mantle/spotMetadataByProductId';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from 'common/productMetadata/types';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
} from 'wagmi/chains';

export const SPOT_METADATA_BY_CHAIN: Record<
  number,
  Record<number, SpotProductMetadata>
> = {
  [arbitrum.id]: ARB_ONE_SPOT_METADATA_BY_PRODUCT_ID,
  [arbitrumSepolia.id]: ARB_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [blastSepolia.id]: BLAST_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [blast.id]: BLAST_SPOT_METADATA_BY_PRODUCT_ID,
  [mantleSepoliaTestnet.id]: MANTLE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID,
  [hardhat.id]: HARDHAT_SPOT_METADATA_BY_PRODUCT_ID,
  [localhost.id]: HARDHAT_SPOT_METADATA_BY_PRODUCT_ID,
} satisfies Record<PrimaryChainID, Record<number, SpotProductMetadata>>;

export const PERP_METADATA_BY_CHAIN: Record<
  number,
  Record<number, PerpProductMetadata>
> = {
  [arbitrum.id]: ARB_ONE_PERP_METADATA_BY_PRODUCT_ID,
  [arbitrumSepolia.id]: ARB_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [blastSepolia.id]: BLAST_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [blast.id]: BLAST_PERP_METADATA_BY_PRODUCT_ID,
  [mantleSepoliaTestnet.id]: MANTLE_SEPOLIA_PERP_METADATA_BY_PRODUCT_ID,
  [hardhat.id]: HARDHAT_PERP_METADATA_BY_PRODUCT_ID,
  [localhost.id]: HARDHAT_PERP_METADATA_BY_PRODUCT_ID,
} satisfies Record<PrimaryChainID, Record<number, PerpProductMetadata>>;
