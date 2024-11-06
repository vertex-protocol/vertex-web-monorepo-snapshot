import { BigDecimal } from '@vertex-protocol/client';
import { TokenIconMetadata } from '@vertex-protocol/metadata';

export interface CollateralSpotProduct {
  icon: TokenIconMetadata;
  symbol: string;
  productId: number;
  displayedAssetAmount: BigDecimal;
  displayedAssetValueUsd: BigDecimal | undefined;
}
