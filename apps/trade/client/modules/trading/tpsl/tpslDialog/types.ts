import { BigDecimal } from '@vertex-protocol/client';
import { PerpProductMetadata } from '@vertex-protocol/metadata';

export const TRIGGER_CRITERIA_PRICE_TYPES = [
  'oracle_price',
  'last_price',
] as const;

export type TriggerCriteriaPriceType =
  (typeof TRIGGER_CRITERIA_PRICE_TYPES)[number];

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
  longWeightInitial: BigDecimal | undefined;
}
