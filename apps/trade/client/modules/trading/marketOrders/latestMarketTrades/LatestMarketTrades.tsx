import { formatNumber } from '@vertex-protocol/react-client';
import { BigDecimals } from '@vertex-protocol/utils';
import {
  joinClassNames,
  safeDiv,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { MarketOrderRow } from 'client/modules/trading/marketOrders/components/MarketOrderRow';
import { MarketOrderRows } from 'client/modules/trading/marketOrders/components/MarketOrderRows';
import { MarketOrdersHeaderRow } from 'client/modules/trading/marketOrders/components/MarketOrdersHeaderRow';
import {
  MarketTradeRowItem,
  useLatestMarketTrades,
} from 'client/modules/trading/marketOrders/latestMarketTrades/hooks/useLatestMarketTrades';
import { first } from 'lodash';
import { useCallback } from 'react';

interface LatestMarketTradesProps extends WithClassnames {
  productId: number | undefined;
}

const SKELETON_ROW = <MarketOrderRow.Skeleton numCols={3} />;

export function LatestMarketTrades({
  productId,
  className,
}: LatestMarketTradesProps) {
  const {
    data,
    setNewPriceInput,
    priceFormatSpecifier,
    amountFormatSpecifier,
  } = useLatestMarketTrades({
    productId,
  });
  // Used for determining new trade rows that should be flashed when mounted.
  const prevLatestTradeTime = useSyncedRef(
    first(data?.trades)?.timestampMillis,
  );

  const renderRow = useCallback(
    (row: MarketTradeRowItem) => {
      const highlightWidthFraction = safeDiv(
        row.decimalAdjustedSize,
        data?.maxTradeSize ?? BigDecimals.ZERO,
      );

      // We don't want to flash if we don't yet have a cached latest trade time,
      // so we just use the given row's time for the comparison in that case.
      const flashOnMount =
        row.timestampMillis >
        (prevLatestTradeTime.current ?? row.timestampMillis);

      return (
        <MarketOrderRow.Container
          isSell={row.isSell}
          highlightWidthFraction={highlightWidthFraction}
          onClick={() => setNewPriceInput(row.price)}
          flashOnMount={flashOnMount}
        >
          <MarketOrderRow.Item isSell={row.isSell}>
            {formatNumber(row.price, {
              formatSpecifier: priceFormatSpecifier,
            })}
          </MarketOrderRow.Item>
          <MarketOrderRow.Item>
            {formatNumber(row.decimalAdjustedSize, {
              formatSpecifier: amountFormatSpecifier,
            })}
          </MarketOrderRow.Item>
          <MarketOrderRow.Item>
            {formatTimestamp(row.timestampMillis, {
              formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
            })}
          </MarketOrderRow.Item>
        </MarketOrderRow.Container>
      );
    },
    [
      amountFormatSpecifier,
      data?.maxTradeSize,
      priceFormatSpecifier,
      setNewPriceInput,
      prevLatestTradeTime,
    ],
  );

  return (
    <div className={joinClassNames('flex flex-col justify-start', className)}>
      <MarketOrdersHeaderRow.Container>
        <MarketOrdersHeaderRow.Item label="Price" />
        <MarketOrdersHeaderRow.Item label="Size" symbol={data?.symbol} />
        <MarketOrdersHeaderRow.Item label="Time" />
      </MarketOrdersHeaderRow.Container>
      <MarketOrderRows
        className="flex-1"
        rows={data?.trades}
        numRows={50}
        renderRow={renderRow}
        skeletonRow={SKELETON_ROW}
      />
    </div>
  );
}
