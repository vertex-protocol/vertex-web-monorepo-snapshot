import {
  isTriggerOrderNonce,
  ProductEngineType,
} from '@vertex-protocol/client';
import { parseRawExpirationTimestamp } from '@vertex-protocol/contracts';
import { IndexerMatchEvent } from '@vertex-protocol/indexer-client';
import { OrderType } from 'client/modules/trading/types';
import { isReducePositionMatchEvent } from 'client/utils/isReducePositionMatchEvent';

export function getOrderType(event: IndexerMatchEvent): OrderType {
  const { type: orderExpirationType } = parseRawExpirationTimestamp(
    event.order.expiration,
  );
  // Currently, market orders are FOK, but historically they have been IOC, this addresses both cases for the time being
  const isMarket =
    orderExpirationType === 'fok' || orderExpirationType === 'ioc';
  const isTriggerOrder = isTriggerOrderNonce(event.order.nonce);
  const isReducePositionPerpTrade =
    isReducePositionMatchEvent(event) &&
    event.postBalances.base.type === ProductEngineType.PERP;

  // This must be checked before isMarket because all trigger orders are market orders
  if (isTriggerOrder) {
    // Filled TP/SL reflect as "Stop Market" orders because we don't have access to triggerCriteria type
    return 'stop';
  }
  if (isMarket) {
    return isReducePositionPerpTrade ? 'market_reduce' : 'market';
  }
  return isReducePositionPerpTrade ? 'limit_reduce' : 'limit';
}
