import { BigDecimals } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { Token } from '@vertex-protocol/metadata';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useAllProductsWithdrawPoolLiquidity } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { useAreWithdrawalsProcessing } from 'client/modules/collateral/hooks/useAreWithdrawalsProcessing';
import { secondsToMilliseconds } from 'date-fns';
import { first, sortBy } from 'lodash';
import { useMemo } from 'react';

interface AccountCenterCollateralEventsWithDate {
  /**
   * Date label (ex. Mar 12, 2024) to be displayed in the UI
   */
  dateLabel: string;
  events: {
    // Unique ID used as the key
    id: string;
    eventType: CollateralEventType;
    timestampMillis: number;
    token: Token;
    amount: BigDecimal;
    submissionIndex: string;
    productId: number;
    isProcessing: boolean | undefined;
    hasWithdrawPoolLiquidity: boolean;
  }[];
}

export function useAccountCenterCollateralHistory() {
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
      // Show max 5 events, users can see full history by clicking on the link
      pageSize: 5,
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
      const marketStaticData =
        productId === QUOTE_PRODUCT_ID
          ? allMarketsStaticData?.primaryQuote
          : allMarketsStaticData?.spot[productId];

      if (!marketStaticData) {
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

      const token = marketStaticData.metadata.token;

      // If there is liquidity in the withdraw pool for this product, then a fast withdraw is available,
      // We enable fast withdraw button depending on this.
      const hasWithdrawPoolLiquidity =
        allProductsWithdrawPoolLiquidityData?.[productId]?.gt(
          BigDecimals.ZERO,
        ) ?? false;

      eventsWithDate.events.push({
        id: `${event.submissionIndex}-${token.symbol}-${event.newAmount.toString()}`,
        eventType: event.eventType,
        timestampMillis,
        token,
        amount: removeDecimals(event.amount),
        submissionIndex: event.submissionIndex,
        isProcessing: areWithdrawalsProcessingData?.[event.submissionIndex],
        hasWithdrawPoolLiquidity,
        productId,
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
    allMarketsStaticData?.primaryQuote,
    allMarketsStaticData?.spot,
    allProductsWithdrawPoolLiquidityData,
    areWithdrawalsProcessingData,
    eventsToProcess,
  ]);

  return {
    eventsWithDate,
  };
}
