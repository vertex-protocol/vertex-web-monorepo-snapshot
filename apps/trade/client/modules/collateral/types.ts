import { BigDecimal } from '@vertex-protocol/client';
import { TokenIconMetadata } from '@vertex-protocol/react-client';
import { SelectValueWithIdentifier } from '@vertex-protocol/web-ui';

export interface CollateralSpotProductSelectValue
  extends SelectValueWithIdentifier {
  icon: TokenIconMetadata;
  symbol: string;
  productId: number;
  displayedAssetAmount: BigDecimal;
  displayedAssetValueUsd: BigDecimal | undefined;
  depositAPR?: BigDecimal;
}
