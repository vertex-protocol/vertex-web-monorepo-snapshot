import { BigDecimal } from '@vertex-protocol/client';
import { PerpProductMetadata } from 'common/productMetadata/types';

export type TriggerCriteriaPriceType = 'oracle_price' | 'last_price';

export interface TpSlOrderInfo {
  productId: number;
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  triggerPrice: BigDecimal;
  estimatedPnlUsd: BigDecimal;
  amountCloseSize: BigDecimal;
}

export interface TpSlPositionData {
  pnlInfo: {
    estimatedPnlUsd: BigDecimal;
    estimatedPnlFrac: BigDecimal;
  };
  metadata: PerpProductMetadata | undefined;
  amount: BigDecimal;
  averageEntryPrice: BigDecimal;
  lastPrice: BigDecimal | undefined;
  fastOraclePrice: BigDecimal;
  sizeIncrement: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
}
