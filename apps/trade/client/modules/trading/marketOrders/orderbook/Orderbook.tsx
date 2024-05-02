import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { OrderbookSettings } from 'client/modules/trading/marketOrders/orderbook/components/OrderbookSettings';
import { OrderbookRowItem } from 'client/modules/trading/marketOrders/orderbook/hooks/types';
import { useOrderbook } from 'client/modules/trading/marketOrders/orderbook/hooks/useOrderbook';
import { orderbookViewTypeAtom } from 'client/store/trading/commonTradingStore';
import { BigDecimals } from 'client/utils/BigDecimals';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { safeDiv } from 'client/utils/safeDiv';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { MarketOrderRow } from '../components/MarketOrderRow';
import { MarketOrderRows } from '../components/MarketOrderRows';
import { MarketOrdersHeaderRow } from '../components/MarketOrdersHeaderRow';
import { OrderbookPriceBox } from './components/OrderbookPriceBox';

export interface Props extends WithClassnames {
  productId: number | undefined;
  oneSidedDepth: number;
  dualSidedDepth: number;
}

const SKELETON_ROW = <MarketOrderRow.Skeleton numCols={3} />;

export function Orderbook({
  className,
  productId,
  oneSidedDepth,
  dualSidedDepth,
}: Props) {
  const [viewType] = useAtom(orderbookViewTypeAtom);

  const depth = viewType === 'bids_and_asks' ? dualSidedDepth : oneSidedDepth;

  const {
    orderbookData,
    lastPrice,
    lastPriceChange,
    setNewPriceInput,
    priceFormatSpecifier,
    amountFormatSpecifier,
    cumulativeAmountSpecifier,
    symbol,
    tickSpacingMultiplier,
    currentTickSpacing,
    setTickSpacingMultiplier,
    showOrderbookTotalInQuote,
    setShowOrderbookTotalInQuote,
  } = useOrderbook({
    productId,
    depth,
  });

  const renderRow = useCallback(
    (row: OrderbookRowItem) => {
      const highlightWidthFraction = safeDiv(
        row.cumulativeAmount,
        orderbookData?.cumulativeTotalAmount ?? BigDecimals.ZERO,
      );

      return (
        <MarketOrderRow.Container
          isSell={row.isAsk}
          highlightWidthFraction={highlightWidthFraction}
          onClick={() => setNewPriceInput(row.price)}
          flashKey={row.assetAmount.toString()}
        >
          <MarketOrderRow.Item isSell={row.isAsk}>
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
      priceFormatSpecifier,
      amountFormatSpecifier,
      cumulativeAmountSpecifier,
      setNewPriceInput,
    ],
  );

  const orderbook = (() => {
    if (viewType === 'only_asks') {
      return (
        <MarketOrderRows
          rows={orderbookData?.asks}
          numRows={depth}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
      );
    }

    if (viewType === 'only_bids') {
      return (
        <MarketOrderRows
          numRows={depth}
          rows={orderbookData?.bids}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
      );
    }

    return (
      <div className="flex h-full flex-col gap-y-1">
        <MarketOrderRows
          className="flex-1 flex-col-reverse"
          rows={orderbookData?.asks}
          numRows={depth}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
        <OrderbookPriceBox
          lastPriceChange={lastPriceChange}
          lastPrice={lastPrice}
          priceIncrement={orderbookData?.priceIncrement}
          setPriceInput={setNewPriceInput}
          spread={{
            spreadFrac: orderbookData?.spread?.frac,
            isHighSpread: orderbookData?.spread?.isHigh,
          }}
        />
        <MarketOrderRows
          className="flex-1"
          numRows={depth}
          rows={orderbookData?.bids}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
      </div>
    );
  })();

  return (
    <div
      className={joinClassNames(
        'divide-overlay-divider/5 flex flex-col divide-y',
        className,
      )}
    >
      <OrderbookSettings
        priceIncrement={orderbookData?.priceIncrement}
        symbol={orderbookData?.productMetadata.symbol}
        currentTickSpacing={currentTickSpacing}
        tickSpacingMultiplier={tickSpacingMultiplier}
        setTickSpacingMultiplier={setTickSpacingMultiplier}
        showOrderbookTotalInQuote={showOrderbookTotalInQuote}
        setShowOrderbookTotalInQuote={setShowOrderbookTotalInQuote}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MarketOrdersHeaderRow.Container>
          <MarketOrdersHeaderRow.Item label="Price" />
          <MarketOrdersHeaderRow.Item
            label="Size"
            symbol={orderbookData?.productMetadata?.symbol}
          />
          <MarketOrdersHeaderRow.Item label="Total" symbol={symbol} />
        </MarketOrdersHeaderRow.Container>
        <div className="no-scrollbar flex-1 overflow-y-auto">{orderbook}</div>
      </div>
    </div>
  );
}
