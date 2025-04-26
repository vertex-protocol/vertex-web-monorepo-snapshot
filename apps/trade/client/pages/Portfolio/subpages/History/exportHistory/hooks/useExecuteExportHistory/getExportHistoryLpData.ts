import { GetIndexerSubaccountLpEventsParams } from '@vertex-protocol/indexer-client';
import {
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryLpItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalLpEventsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLpEventsTable';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';
import { last } from 'lodash';

export async function getExportHistoryLpData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryLpItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountLpEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const lpEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountLpEvents(
        queryParams,
      );

    for (const event of lpEventsResponse.events) {
      const productId = event.baseSnapshot.market.productId;
      const staticMarketData = allMarketsStaticData.allMarkets[productId];

      if (!staticMarketData) {
        continue;
      }

      const tableItem = getHistoricalLpEventsTableItem({
        event,
        staticMarketData,
        primaryQuotePriceUsd,
        primaryQuoteToken:
          allMarketsStaticData.primaryQuoteProduct.metadata.token,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: new Date(tableItem.timestampMillis),
        primaryQuoteAmountDelta: tableItem.amountChanges.quoteAmount,
        baseAsset: tableItem.metadata.base.symbol,
        baseAssetAmountDelta: tableItem.amountChanges.baseAmount,
        lpAmountDelta: tableItem.lpAmount,
      });
    }

    // Update the next cursor
    startCursor = lpEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!lpEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
