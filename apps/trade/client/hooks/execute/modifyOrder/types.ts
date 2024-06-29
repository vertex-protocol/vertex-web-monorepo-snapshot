import { BigDecimal } from '@vertex-protocol/client';
import { OrderType } from 'client/modules/trading/types';

export interface ModifyOrderParams {
  productId: number;
  digest: string;
  orderType: OrderType;
  isTrigger: boolean;
  newPrice: BigDecimal;
}

export interface ModifyOrderResult {
  digest: string;
}
