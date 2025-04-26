import { BigDecimals } from '@vertex-protocol/client';
import { GetIndexerSubaccountLiquidationEventsParams } from '@vertex-protocol/indexer-client';
import {
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryLiquidationItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';
import { last } from 'lodash';

export async function getExportHistoryLiquidationsData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryLiquidationItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountLiquidationEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const liquidationEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountLiquidationEvents(
        queryParams,
      );

    for (const event of liquidationEventsResponse.events) {
      const tableItem = getHistoricalLiquidationsTableItem({
        allMarketsStaticData,
        event,
        primaryQuotePriceUsd,
      });

      if (!tableItem) {
        continue;
      }

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      // Add LPs first
      tableItem.decomposedLps.forEach((decomposedLp) => {
        items.push({
          time: new Date(tableItem.timestampMillis),
          submissionIndex: tableItem.submissionIndex,
          balanceType: 'lp',
          productName: decomposedLp.sharedMetadata.symbol,
          amountLiquidated: decomposedLp.amountLpDecomposed,
          assetAmountDelta: decomposedLp.underlyingBalanceDelta,
        });
      });

      // Add spot
      if (tableItem.spot) {
        items.push({
          time: new Date(tableItem.timestampMillis),
          submissionIndex: tableItem.submissionIndex,
          balanceType: 'spot',
          productName: tableItem.spot.sharedMetadata.symbol,
          amountLiquidated: tableItem.spot.amountLiquidated,
          assetAmountDelta: tableItem.spot.amountLiquidated.negated(),
        });
      }

      // Add perp
      if (tableItem.perp) {
        items.push({
          time: new Date(tableItem.timestampMillis),
          submissionIndex: tableItem.submissionIndex,
          balanceType: tableItem.perp.liquidatedBalanceType,
          productName: tableItem.perp.sharedMetadata.marketName,
          amountLiquidated: tableItem.perp.amountLiquidated,
          assetAmountDelta: tableItem.perp.amountLiquidated.negated(),
        });
      }

      // Add primary quote transfer
      items.push({
        time: new Date(tableItem.timestampMillis),
        submissionIndex: tableItem.submissionIndex,
        balanceType: 'spot',
        productName:
          allMarketsStaticData.primaryQuoteProduct.metadata.token.symbol,
        amountLiquidated: BigDecimals.ZERO,
        assetAmountDelta: tableItem.quoteBalanceDelta,
      });
    }

    // Update the next cursor
    startCursor = liquidationEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!liquidationEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
