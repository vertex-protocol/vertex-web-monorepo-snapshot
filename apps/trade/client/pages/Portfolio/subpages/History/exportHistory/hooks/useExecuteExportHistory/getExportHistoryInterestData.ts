import { removeDecimals } from '@vertex-protocol/utils';
import {
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryInterestItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds, secondsToMilliseconds } from 'date-fns';
import { last } from 'lodash';

export async function getExportHistoryInterestData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const { subaccount, vertexClient, allMarketsStaticData } = context;
  const items: ExportHistoryInterestItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const response =
      await vertexClient.context.indexerClient.getPaginatedSubaccountInterestFundingPayments(
        {
          subaccountOwner: subaccount.address,
          subaccountName: subaccount.name,
          maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
          limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
          startCursor,
          productIds: allMarketsStaticData.spotMarketsProductIds,
        },
      );

    for (const event of response.interestPayments) {
      const timestampMillis = secondsToMilliseconds(event.timestamp.toNumber());
      if (timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      const asset =
        allMarketsStaticData.spotProducts[event.productId]?.metadata.token
          .symbol;
      const interestPaymentAmount = removeDecimals(event.paymentAmount);

      items.push({
        time: new Date(timestampMillis),
        asset,
        annualRateFrac: event.annualPaymentRate,
        interestPaymentAmount,
      });
    }

    // Update the next cursor
    startCursor = response.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!response.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
