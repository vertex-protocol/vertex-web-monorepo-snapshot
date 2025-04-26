import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useAllProductsWithdrawPoolLiquidity } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { useAreWithdrawalsProcessing } from 'client/modules/collateral/hooks/useAreWithdrawalsProcessing';
import {
  getHistoricalCollateralEventsTableItem,
  HistoricalCollateralEventsTableItem,
} from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { secondsToMilliseconds } from 'date-fns';
import { first, sortBy } from 'lodash';
import { useMemo } from 'react';

interface AccountCenterCollateralEventsWithDate {
  /**
   * Date label (ex. Mar 12, 2024) to be displayed in the UI
   */
  dateLabel: string;
  events: (HistoricalCollateralEventsTableItem & {
    // Unique ID used as the key
    id: string;
  })[];
}

export function useAccountCenterCollateralHistory() {
  const { getSubaccountProfile } = useSubaccountContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: allProductsWithdrawPoolLiquidityData } =
    useAllProductsWithdrawPoolLiquidity();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: paginatedCollateralEvents } =
    useSubaccountPaginatedCollateralEvents({
      eventTypes: [
        'deposit_collateral',
        'withdraw_collateral',
        'transfer_quote',
      ],
      // Show max 4 events, users can see full history by clicking on the link
      pageSize: 4,
    });

  const eventsToProcess = useMemo(
    () => first(paginatedCollateralEvents?.pages)?.events,
    [paginatedCollateralEvents?.pages],
  );

  const submissionIndices = useMemo(
    () => eventsToProcess?.map((event) => event.submissionIndex),
    [eventsToProcess],
  );

  const areWithdrawalsProcessingData = useAreWithdrawalsProcessing({
    submissionIndices,
  });

  /**
   * Mapping from date label (ex. Mar 12, 2024) to events on that date
   */
  const eventsWithDate = useMemo(() => {
    // First construct a mapping from date label -> events
    const eventsByDateLabel: Record<
      string,
      AccountCenterCollateralEventsWithDate
    > = {};

    eventsToProcess?.forEach((event) => {
      const productId = event.snapshot.market.productId;
      const staticSpotMarketData =
        getStaticMarketDataForProductId<SpotStaticMarketData>(
          productId,
          allMarketsStaticData,
        );

      if (!staticSpotMarketData) {
        return;
      }

      const timestampMillis = secondsToMilliseconds(event.timestamp.toNumber());
      const dateLabel = formatTimestamp(timestampMillis, {
        formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
      });
      const eventsWithDate: AccountCenterCollateralEventsWithDate =
        eventsByDateLabel[dateLabel] ?? {
          dateLabel,
          events: [],
        };

      const tableItem = getHistoricalCollateralEventsTableItem({
        event,
        staticSpotMarketData,
        allMarketsStaticData,
        primaryQuotePriceUsd,
        areWithdrawalsProcessingData,
        allProductsWithdrawPoolLiquidityData,
        getSubaccountProfile,
      });

      eventsWithDate.events.push({
        id: `${event.submissionIndex}-${tableItem.token.symbol}-${event.newAmount.toString()}`,
        ...tableItem,
      });

      eventsByDateLabel[dateLabel] = eventsWithDate;
    });

    // Now sort groups by timestamp in descending order
    return sortBy(
      Object.values(eventsByDateLabel),
      (eventsWithDate) =>
        -1 * (first(eventsWithDate.events)?.timestampMillis ?? 0),
    );
  }, [
    allMarketsStaticData,
    allProductsWithdrawPoolLiquidityData,
    areWithdrawalsProcessingData,
    eventsToProcess,
    getSubaccountProfile,
    primaryQuotePriceUsd,
  ]);

  return {
    eventsWithDate,
  };
}
