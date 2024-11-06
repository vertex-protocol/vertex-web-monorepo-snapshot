import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerSubaccountInterestFundingPaymentsParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

interface Params {
  // Defaults to 10
  pageSize?: number;
  productIds?: number[];
}

export function subaccountPaginatedPaymentEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  productIds?: number[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedPaymentEvents',
    chainEnv,
    subaccountOwner,
    subaccountName,
    productIds,
    pageSize,
  );
}

/**
 * Retrieves a paginated list of funding and interest payments for a subaccount
 * We should _only_ be querying for either spot (interest) or perp (funding) with one invocation of the hook
 * Interest payments table -> query for spot products
 * Funding payments table -> query for perp products
 *
 * Note: the "rate" given by each event is annualized,
 * This was designed to simplify calculations for the Interest table,
 * For the Funding table, we will need to convert from annualized funding to hourly,
 * hourly funding rate = annualized funding rate / (number of days in a year X number of hours in a day)
 *
 * @param pageSize
 * @param productIds
 */
export function useSubaccountPaginatedPaymentEvents({
  pageSize = 10,
  productIds,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();

  const disabled = !vertexClient || !subaccountOwner || !productIds?.length;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedPaymentEventsQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      productIds,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const params: GetIndexerSubaccountInterestFundingPaymentsParams = {
        subaccountOwner,
        subaccountName,
        productIds,
        limit: pageSize,
        startCursor: pageParam,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountInterestFundingPayments(
        params,
      );
    },
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
    enabled: !disabled,
    // Interest payments happen every 15min, and funding every hr, so constant refetch is not that important
  });
}
