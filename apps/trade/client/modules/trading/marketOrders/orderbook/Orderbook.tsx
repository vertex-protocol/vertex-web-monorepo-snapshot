import { formatNumber } from '@vertex-protocol/react-client';
import { BigDecimals } from '@vertex-protocol/utils';
import {
  joinClassNames,
  safeDiv,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { MarketOrderRow } from 'client/modules/trading/marketOrders/components/MarketOrderRow';
import { MarketOrderRows } from 'client/modules/trading/marketOrders/components/MarketOrderRows';
import { MarketOrdersHeaderRow } from 'client/modules/trading/marketOrders/components/MarketOrdersHeaderRow';
import { OrderbookPriceBox } from 'client/modules/trading/marketOrders/orderbook/components/OrderbookPriceBox';
import { OrderbookSettings } from 'client/modules/trading/marketOrders/orderbook/components/OrderbookSettings';
import { OrderbookRowItem } from 'client/modules/trading/marketOrders/orderbook/hooks/types';
import { useOrderbook } from 'client/modules/trading/marketOrders/orderbook/hooks/useOrderbook';
import { orderbookViewTypeAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export interface Props extends WithClassnames {
  productId: number | undefined;
}

const SKELETON_ROW = <MarketOrderRow.Skeleton numCols={3} />;

export function Orderbook({ className, productId }: Props) {
  const [viewType] = useAtom(orderbookViewTypeAtom);
  // Depth is per-side, so we need to show more rows when only viewing one side of the book
  const depth = (() => {
    switch (viewType) {
      case 'only_bids':
        return 40;
      case 'only_asks':
        return 40;
      case 'bids_and_asks':
        return 24;
    }
  })();

  const {
    orderbookData,
    lastPrice,
    lastPriceChange,
    setNewPriceInput,
    priceFormatSpecifier,
    amountFormatSpecifier,
    cumulativeAmountSpecifier,
    amountSymbol,
    tickSpacingMultiplier,
    currentTickSpacing,
    setTickSpacingMultiplier,
    showOrderbookTotalInQuote,
    setShowOrderbookTotalInQuote,
    openOrderPrices,
  } = useOrderbook({
    productId,
    depth,
  });

  const renderRow = useCallback(
    (row: OrderbookRowItem) => {
      const highlightWidthFraction = safeDiv(
        row.cumulativeAmount,
        orderbookData?.maxCumulativeTotalAmount ?? BigDecimals.ZERO,
      );

      const hasOpenOrder = openOrderPrices?.has(row.price.toString());

      return (
        <MarketOrderRow.Container
          isSell={row.isAsk}
          highlightWidthFraction={highlightWidthFraction}
          onClick={() => setNewPriceInput(row.price)}
          flashKey={row.assetAmount?.toString()}
          definitionId={hasOpenOrder ? 'tradingOrderbookOpenOrder' : undefined}
        >
          <MarketOrderRow.Item className="relative" isSell={row.isAsk}>
            {hasOpenOrder && (
              <Icons.CaretRightFill
                className="absolute top-1/2 -left-3 -translate-y-1/2"
                size={8}
              />
            )}
            {formatNumber(row.price, {
              formatSpecifier: priceFormatSpecifier,
            })}
          </MarketOrderRow.Item>
          <MarketOrderRow.Item>
            {formatNumber(row.assetAmount, {
              formatSpecifier: amountFormatSpecifier,
            })}
          </MarketOrderRow.Item>
          <MarketOrderRow.Item>
            {formatNumber(row.cumulativeAmount, {
              formatSpecifier: cumulativeAmountSpecifier,
            })}
          </MarketOrderRow.Item>
        </MarketOrderRow.Container>
      );
    },
    [
      orderbookData?.maxCumulativeTotalAmount,
      openOrderPrices,
      priceFormatSpecifier,
      amountFormatSpecifier,
      cumulativeAmountSpecifier,
      setNewPriceInput,
    ],
  );

  return (
    <div
      className={joinClassNames(
        'divide-overlay-divider flex flex-col divide-y',
        className,
      )}
    >
      <OrderbookSettings
        priceIncrement={orderbookData?.priceIncrement}
        symbol={orderbookData?.productMetadata.symbol}
        quoteSymbol={orderbookData?.quoteSymbol}
        currentTickSpacing={currentTickSpacing}
        tickSpacingMultiplier={tickSpacingMultiplier}
        setTickSpacingMultiplier={setTickSpacingMultiplier}
        showOrderbookTotalInQuote={showOrderbookTotalInQuote}
        setShowOrderbookTotalInQuote={setShowOrderbookTotalInQuote}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MarketOrdersHeaderRow.Container>
          <MarketOrdersHeaderRow.Item label="Price" />
          <MarketOrdersHeaderRow.Item label="Size" />
          <MarketOrdersHeaderRow.Item label="Total" symbol={amountSymbol} />
        </MarketOrdersHeaderRow.Container>
        <div className="flex flex-1 flex-col gap-y-1 overflow-hidden">
          {viewType !== 'only_bids' && (
            <MarketOrderRows
              className="flex-1"
              rows={orderbookData?.asks}
              numRows={depth}
              skeletonRow={SKELETON_ROW}
              renderRow={renderRow}
              reverseRows
            />
          )}
          <OrderbookPriceBox
            lastPriceChange={lastPriceChange}
            lastPrice={lastPrice}
            priceIncrement={orderbookData?.priceIncrement}
            setPriceInput={setNewPriceInput}
            spread={{
              spreadFrac: orderbookData?.spread?.frac,
              isHighSpread: orderbookData?.spread?.isHigh,
            }}
            viewType={viewType}
          />
          {viewType !== 'only_asks' && (
            <MarketOrderRows
              className="flex-1"
              numRows={depth}
              rows={orderbookData?.bids}
              skeletonRow={SKELETON_ROW}
              renderRow={renderRow}
            />
          )}
        </div>
      </div>
    </div>
  );
}
