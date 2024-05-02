import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import {
  MarketTradeRowItem,
  useLatestMarketTrades,
} from 'client/modules/trading/marketOrders/latestMarketTrades/hooks/useLatestMarketTrades';
import { BigDecimals } from 'client/utils/BigDecimals';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { safeDiv } from 'client/utils/safeDiv';
import { first } from 'lodash';
import { useCallback } from 'react';
import { MarketOrderRow } from '../components/MarketOrderRow';
import { MarketOrderRows } from '../components/MarketOrderRows';
import { MarketOrdersHeaderRow } from '../components/MarketOrdersHeaderRow';

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
        data?.maxTradeSize.times(2) ?? BigDecimals.ZERO,
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
      {/* Allow vertical scrolling */}
      <div className="no-scrollbar flex flex-1 flex-col gap-y-0.5 overflow-y-auto">
        <MarketOrderRows
          rows={data?.trades}
          numRows={50}
          renderRow={renderRow}
          skeletonRow={SKELETON_ROW}
        />
      </div>
    </div>
  );
}
