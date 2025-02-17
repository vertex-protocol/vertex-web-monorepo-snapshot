import { GetIndexerSubaccountCollateralEventsParams } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import {
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { formatExportHistoryTimestamp } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryCollateralItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalCollateralEventsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';

export async function getExportHistoryCollateralData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
    getSubaccountProfile,
  } = context;
  const items: ExportHistoryCollateralItem[] = [];

  let startCursor: string | undefined = undefined;
  const queryEventTypes = ((): CollateralEventType[] => {
    switch (params.type) {
      case 'deposits':
        return ['deposit_collateral'];
      case 'withdrawals':
        return ['withdraw_collateral'];
      case 'transfers':
        return ['transfer_quote'];
      default:
        throw Error(
          `Invalid history export type for getting collateral data ${params.type}`,
        );
    }
  })();

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountCollateralEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
      eventTypes: queryEventTypes,
    };

    const collateralEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountCollateralEvents(
        queryParams,
      );

    for (const event of collateralEventsResponse.events) {
      const productId = event.snapshot.market.productId;
      const staticSpotMarketData =
        productId === QUOTE_PRODUCT_ID
          ? allMarketsStaticData.primaryQuote
          : allMarketsStaticData.spot[productId];

      if (!staticSpotMarketData) {
        continue;
      }

      const tableItem = getHistoricalCollateralEventsTableItem({
        event,
        staticSpotMarketData,
        allMarketsStaticData,
        primaryQuotePriceUsd,
        getSubaccountProfile,
        // These are not needed for the export data
        allProductsWithdrawPoolLiquidityData: undefined,
        areWithdrawalsProcessingData: undefined,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: formatExportHistoryTimestamp(tableItem.timestampMillis),
        asset: staticSpotMarketData.metadata.token.symbol,
        balanceChange: tableItem.amount.toString(),
        ...tableItem.transferEventData,
      });
    }

    // Update the next cursor
    startCursor = collateralEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!collateralEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
