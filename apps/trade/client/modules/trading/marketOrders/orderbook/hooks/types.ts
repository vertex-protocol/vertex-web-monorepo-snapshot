import { SharedProductMetadata } from '@vertex-protocol/metadata';
import { BigDecimal } from '@vertex-protocol/utils';
import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';

export interface OrderbookParams {
  productId: number | undefined;
  // Number of bids/asks to display
  depth: number;
}

export interface OrderbookRowItem {
  id: string;
  isAsk: boolean;
  price: BigDecimal;
  // Asset = product for orderbook (ex. wETH), decimal adjusted, undefined if there's no liquidity at this level
  assetAmount: BigDecimal | undefined;
  // Cumulative amount in asset currency (ex. wETH) or quote currency (ex. USDC)
  cumulativeAmount: BigDecimal;
}

export interface OrderbookData {
  productMetadata: SharedProductMetadata;
  quoteSymbol: string;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
  // Total cumulative amount in either asset currency (ex. wETH) or quote currency (ex. USDC) - the background color fill adapts to this as per figma
  cumulativeTotalAmount: BigDecimal;
  // Ascending, from bid price
  bids: OrderbookRowItem[];
  // Descending, from ask price
  asks: OrderbookRowItem[];
  spread: {
    amount: BigDecimal;
    // Percentage expressed as a fraction (ex. 0.01 = 1%)
    frac: BigDecimal;
    // Whether the spread for the market is abnormally high
    isHigh: boolean;
  };
}

export interface UseOrderbook {
  orderbookData: OrderbookData | undefined;
  priceFormatSpecifier: string;
  amountFormatSpecifier: string;
  cumulativeAmountSpecifier: string;
  amountSymbol: string | undefined;
  currentTickSpacing: number;
  tickSpacingMultiplier: OrderbookPriceTickSpacingMultiplier;
  setTickSpacingMultiplier: (
    value: OrderbookPriceTickSpacingMultiplier,
  ) => void;
  showOrderbookTotalInQuote: boolean;
  setShowOrderbookTotalInQuote: (value: boolean) => void;
  setNewPriceInput: (val: BigDecimal) => void;
  lastPrice: BigDecimal | undefined;
  lastPriceChange: BigDecimal | undefined;
  // Prices of open orders presented as string for proper comparison
  openOrderPrices: Set<string> | undefined;
}
