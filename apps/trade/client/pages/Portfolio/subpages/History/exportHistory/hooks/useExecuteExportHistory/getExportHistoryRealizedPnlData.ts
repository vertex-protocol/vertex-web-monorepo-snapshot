import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { getRealizedPnlEvent } from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { getRealizedPnlEventsTableItem } from 'client/modules/tables/hooks/useRealizedPnlEventsTable';
import {
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryRealizedPnlItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';
import { last } from 'lodash';

export async function getExportHistoryRealizedPnlData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryRealizedPnlItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountMatchEventParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const matchEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountMatchEvents(
        queryParams,
      );

    for (const event of matchEventsResponse.events) {
      const realizedPnlEvent = getRealizedPnlEvent({ matchEvent: event });

      if (!realizedPnlEvent) {
        continue;
      }

      const staticMarketData = allMarketsStaticData.allMarkets[event.productId];
      const staticQuoteData = allMarketsStaticData.quotes[event.productId];

      if (!staticMarketData || !staticQuoteData) {
        continue;
      }

      const tableItem = getRealizedPnlEventsTableItem({
        event: realizedPnlEvent,
        staticMarketData,
        primaryQuotePriceUsd,
        staticQuoteData,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: new Date(tableItem.timestampMillis),
        marketName: tableItem.marketInfo.marketName,
        preEventBalanceAmount: removeDecimals(
          realizedPnlEvent.preEventBalanceAmount,
        ),
        marginModeType: tableItem.marginModeType,
        entryPrice: tableItem.entryPrice,
        exitPrice: tableItem.exitPrice,
        filledAmountAbs: tableItem.filledAmountAbs,
        // Use non-USD adjusted values for PnL - should make it easier for scripts to calculate balance changes
        pnl: removeDecimals(realizedPnlEvent.realizedPnl),
      });
    }

    // Update the next cursor
    startCursor = matchEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!matchEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
