import { WithClassnames } from '@vertex-protocol/web-common';
import { useOrderbook } from 'client/modules/trading/marketOrders/orderbook/hooks/useOrderbook';
import { BigDecimals } from 'client/utils/BigDecimals';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { safeDiv } from 'client/utils/safeDiv';
import { useCallback } from 'react';
import { MarketOrderRow } from '../components/MarketOrderRow';
import { MarketOrderRows } from '../components/MarketOrderRows';
import { MarketOrdersHeaderRow } from '../components/MarketOrdersHeaderRow';
import { OrderbookPriceBox } from './components/OrderbookPriceBox';
import { OrderbookRowItem } from './hooks/types';

interface Props extends WithClassnames {
  productId: number | undefined;
  depth: number;
}

const SKELETON_ROW = <MarketOrderRow.Skeleton numCols={1} />;

export function MobileOrderbookPreview({ className, productId, depth }: Props) {
  const {
    orderbookData,
    lastPrice,
    lastPriceChange,
    setNewPriceInput,
    symbol,
    cumulativeAmountSpecifier,
    priceFormatSpecifier,
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
          flashKey={row.cumulativeAmount.toString()}
        >
          <MarketOrderRow.Item isSell={row.isAsk}>
            {formatNumber(row?.price, {
              formatSpecifier: priceFormatSpecifier,
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
      cumulativeAmountSpecifier,
      setNewPriceInput,
    ],
  );

  return (
    <div className={className}>
      <MarketOrdersHeaderRow.Container className="border-stroke border-b">
        <MarketOrdersHeaderRow.Item label="Price" />
        <MarketOrdersHeaderRow.Item label="Tot." symbol={symbol} />
      </MarketOrdersHeaderRow.Container>
      <div className="flex h-full w-full flex-col gap-y-1">
        <MarketOrderRows
          className="flex-col-reverse"
          rows={orderbookData?.asks}
          numRows={depth}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
        <OrderbookPriceBox
          className="text-xs"
          lastPriceChange={lastPriceChange}
          lastPrice={lastPrice}
          priceIncrement={orderbookData?.priceIncrement}
          setPriceInput={setNewPriceInput}
          spread={null}
        />
        <MarketOrderRows
          numRows={depth}
          rows={orderbookData?.bids}
          skeletonRow={SKELETON_ROW}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
}
