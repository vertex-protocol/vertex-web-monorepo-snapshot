import { formatNumber } from '@vertex-protocol/react-client';
import { BigDecimals } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS, Icons } from '@vertex-protocol/web-ui';
import { MarketOrderRow } from 'client/modules/trading/marketOrders/components/MarketOrderRow';
import { MarketOrderRows } from 'client/modules/trading/marketOrders/components/MarketOrderRows';
import { MarketOrdersHeaderRow } from 'client/modules/trading/marketOrders/components/MarketOrdersHeaderRow';
import { OrderbookPriceBox } from 'client/modules/trading/marketOrders/orderbook/components/OrderbookPriceBox';
import { OrderbookSettings } from 'client/modules/trading/marketOrders/orderbook/components/OrderbookSettings';
import { OrderbookRowItem } from 'client/modules/trading/marketOrders/orderbook/hooks/types';
import { useOrderbook } from 'client/modules/trading/marketOrders/orderbook/hooks/useOrderbook';
import { orderbookViewTypeAtom } from 'client/store/trading/commonTradingStore';
import { safeDiv } from 'client/utils/safeDiv';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export interface Props extends WithClassnames {
  productId: number | undefined;
}

const DEPTH = 40;

const SKELETON_ROW = <MarketOrderRow.Skeleton numCols={3} />;

export function Orderbook({ className, productId }: Props) {
  const [viewType] = useAtom(orderbookViewTypeAtom);

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
    depth: DEPTH,
  });

  const renderRow = useCallback(
    (row: OrderbookRowItem) => {
      const highlightWidthFraction = safeDiv(
        row.cumulativeAmount,
        orderbookData?.cumulativeTotalAmount ?? BigDecimals.ZERO,
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
                className="absolute -left-3 top-1/2 -translate-y-1/2"
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
      orderbookData?.cumulativeTotalAmount,
      openOrderPrices,
      priceFormatSpecifier,
      amountFormatSpecifier,
      cumulativeAmountSpecifier,
      setNewPriceInput,
    ],
  );

  const orderbook = (() => {
    return (
      <div className="flex h-full flex-col gap-y-1">
        {viewType !== 'only_bids' && (
          <MarketOrderRows
            className="flex-1"
            rows={orderbookData?.asks}
            numRows={DEPTH}
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
            numRows={DEPTH}
            rows={orderbookData?.bids}
            skeletonRow={SKELETON_ROW}
            renderRow={renderRow}
          />
        )}
      </div>
    );
  })();

  return (
    <div
      className={joinClassNames(
        'flex flex-col divide-y',
        COMMON_TRANSPARENCY_COLORS.divide,
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
        <div className="no-scrollbar flex-1 overflow-y-auto">{orderbook}</div>
      </div>
    </div>
  );
}
