import { AsyncResult } from '@vertex-protocol/client';
import { EngineServerExecuteResult } from '@vertex-protocol/engine-client';
import { TriggerServerExecuteResult } from '@vertex-protocol/trigger-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { OrderType } from 'client/modules/trading/types';

export interface CancellableOrder {
  productId: number;
  digest: string;
  isTrigger: boolean;
}

export interface CancellableOrderWithNotificationInfo extends CancellableOrder {
  // Decimal adjusted
  totalAmount: BigDecimal;
  orderType: OrderType;
}

export interface CancelOrdersParams {
  orders: CancellableOrder[];
}

export interface CancelOrdersWithNotificationParams {
  orders: CancellableOrderWithNotificationInfo[];
}

export interface CancelOrdersResult {
  // Whether these are populated depends on the type of the order being cancelled
  engine?: AsyncResult<EngineServerExecuteResult, unknown>;
  trigger?: AsyncResult<TriggerServerExecuteResult, unknown>;
}
