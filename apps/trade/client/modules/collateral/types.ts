import { BigDecimal } from '@vertex-protocol/client';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';

export interface CollateralSpotProduct {
  icon: TokenIconMetadata;
  symbol: string;
  productId: number;
  displayedAssetAmount: BigDecimal;
  displayedAssetValueUsd: BigDecimal | undefined;
}
