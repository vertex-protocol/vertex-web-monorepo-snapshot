import { BTC_PERP_METADATA, ETH_PERP_METADATA } from '../perpMetadata';
import { PerpProductMetadata } from '../types';

export const HARDHAT_PERP_METADATA_BY_PRODUCT_ID: Record<
  number,
  PerpProductMetadata
> = {
  2: BTC_PERP_METADATA,
  4: ETH_PERP_METADATA,
} as const;
