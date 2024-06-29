import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { Token } from 'common/productMetadata/types';
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
    timestampMillis: number;
    token: Token;
    amount: BigDecimal;
  }[];
}

export function useAccountCenterCollateralHistory() {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: paginatedCollateralEvents } =
    useSubaccountPaginatedCollateralEvents({
      eventTypes: ['deposit_collateral', 'withdraw_collateral'],
      // Show max 5 events, users can see full history by clicking on the link
      pageSize: 5,
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

    const eventsToProcess = first(paginatedCollateralEvents?.pages)?.events;

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

      eventsWithDate.events.push({
        id: `${event.submissionIndex}-${token.symbol}-${event.newAmount.toString()}`,
        timestampMillis,
        token,
        amount: removeDecimals(event.amount),
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
    paginatedCollateralEvents?.pages,
  ]);

  return {
    eventsWithDate,
  };
}
