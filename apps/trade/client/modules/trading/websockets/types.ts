import {
  EngineServerPriceTickLiquidity,
  EngineServerSubscriptionTradeEvent,
} from '@vertex-protocol/engine-client';

export interface BatchBookDepthUpdateData {
  bids: Record<string, EngineServerPriceTickLiquidity>;
  asks: Record<string, EngineServerPriceTickLiquidity>;
}

export type BatchMarketTradeUpdateData = EngineServerSubscriptionTradeEvent[];
