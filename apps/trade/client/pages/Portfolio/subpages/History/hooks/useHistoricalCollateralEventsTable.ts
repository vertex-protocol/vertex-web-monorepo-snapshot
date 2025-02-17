import {
  BigDecimals,
  subaccountFromHex,
  VertexTransferQuoteTx,
} from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountCollateralEventsResponse,
  IndexerCollateralEvent,
} from '@vertex-protocol/indexer-client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { Token } from '@vertex-protocol/react-client';
import {
  BigDecimal,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  AllMarketsStaticDataForChainEnv,
  SpotStaticMarketData,
} from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useAllProductsWithdrawPoolLiquidity } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { useAreWithdrawalsProcessing } from 'client/modules/collateral/hooks/useAreWithdrawalsProcessing';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { isIsoSubaccountHex } from 'client/utils/isIsoSubaccount';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { toBytes } from 'viem';

export interface HistoricalCollateralEventsTableItem {
  token: Token;
  eventType: CollateralEventType;
  timestampMillis: number;
  size: BigDecimal;
  valueUsd: BigDecimal;
  isProcessing: boolean | undefined;
  hasWithdrawPoolLiquidity: boolean;
  submissionIndex: string;
  amount: BigDecimal;
  productId: number;
  transferEventData:
    | {
        fromSubaccountName: string;
        toSubaccountName: string;
        fromSubaccountUsername: string;
        toSubaccountUsername: string;
      }
    | undefined;
}

const PAGE_SIZE = 10;

function extractItems(
  data: GetIndexerSubaccountCollateralEventsResponse,
): IndexerCollateralEvent[] {
  return data.events;
}

export function useHistoricalCollateralEventsTable({
  eventTypes,
}: {
  eventTypes: CollateralEventType[];
}) {
  const { getSubaccountProfile } = useSubaccountContext();
  const { data: allProductsWithdrawPoolLiquidityData } =
    useAllProductsWithdrawPoolLiquidity();
  const { data: allMarketsStaticData, isLoading: allMarketsLoading } =
    useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const {
    data: subaccountPaginatedEvents,
    isLoading: subaccountPaginatedEventsLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useSubaccountPaginatedCollateralEvents({
    eventTypes,
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountCollateralEventsResponse,
    IndexerCollateralEvent
  >({
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const pageDataEvents = useMemo(
    () => getPageData(subaccountPaginatedEvents),
    [getPageData, subaccountPaginatedEvents],
  );

  const submissionIndices = useMemo(
    () => pageDataEvents?.map((event) => event.submissionIndex),
    [pageDataEvents],
  );

  const areWithdrawalsProcessingData = useAreWithdrawalsProcessing({
    submissionIndices,
  });

  const mappedData: HistoricalCollateralEventsTableItem[] | undefined =
    useMemo(() => {
      if (!subaccountPaginatedEvents || !allMarketsStaticData) {
        return undefined;
      }
      return getPageData(subaccountPaginatedEvents)
        .map((event) => {
          const productId = event.snapshot.market.productId;
          const staticSpotMarketData =
            productId === QUOTE_PRODUCT_ID
              ? allMarketsStaticData.primaryQuote
              : allMarketsStaticData.spot[productId];

          if (!staticSpotMarketData) {
            console.warn(
              `[useHistoricalCollateralEventsTable] Product ${productId} not found`,
            );
            return undefined;
          }

          return getHistoricalCollateralEventsTableItem({
            event,
            staticSpotMarketData,
            allMarketsStaticData,
            areWithdrawalsProcessingData,
            allProductsWithdrawPoolLiquidityData,
            primaryQuotePriceUsd,
            getSubaccountProfile,
          });
        })
        .filter(nonNullFilter);
    }, [
      subaccountPaginatedEvents,
      allMarketsStaticData,
      getPageData,
      areWithdrawalsProcessingData,
      allProductsWithdrawPoolLiquidityData,
      primaryQuotePriceUsd,
      getSubaccountProfile,
    ]);

  return {
    isLoading:
      subaccountPaginatedEventsLoading ||
      allMarketsLoading ||
      isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalCollateralEventsTableItemParams {
  event: IndexerCollateralEvent;
  staticSpotMarketData: SpotStaticMarketData;
  allMarketsStaticData: AllMarketsStaticDataForChainEnv | undefined;
  areWithdrawalsProcessingData: Record<string, boolean> | undefined;
  allProductsWithdrawPoolLiquidityData: Record<number, BigDecimal> | undefined;
  primaryQuotePriceUsd: BigDecimal;
  getSubaccountProfile: (subaccountName: string) => SubaccountProfile;
}

export function getHistoricalCollateralEventsTableItem({
  event,
  allMarketsStaticData,
  staticSpotMarketData,
  primaryQuotePriceUsd,
  areWithdrawalsProcessingData,
  allProductsWithdrawPoolLiquidityData,
  getSubaccountProfile,
}: GetHistoricalCollateralEventsTableItemParams): HistoricalCollateralEventsTableItem {
  const eventType = event.eventType;
  const productId = event.snapshot.market.productId;
  const metadata = staticSpotMarketData.metadata.token;
  const amount = removeDecimals(toBigDecimal(event.amount));
  const size = amount.abs();
  const isWithdraw = eventType === 'withdraw_collateral';
  const isProcessing =
    isWithdraw && areWithdrawalsProcessingData?.[event.submissionIndex];

  const oraclePrice = event.snapshot.market.product.oraclePrice;

  // If there is liquidity in the withdraw pool for this product, then a fast withdraw is available,
  // We enable fast withdraw button depending on this.
  const hasWithdrawPoolLiquidity =
    allProductsWithdrawPoolLiquidityData?.[productId]?.gt(BigDecimals.ZERO) ??
    false;

  // Sender & recipient subaccounts, only for transfers
  const transferEventData = (() => {
    if (eventType !== 'transfer_quote') {
      return;
    }

    const {
      transfer_quote: { sender, recipient },
    } = event.tx as VertexTransferQuoteTx;

    const { name: fromSubaccountName, username: fromSubaccountUsername } =
      getNormalizedSubaccountInfo({
        subaccount: sender,
        allMarketsStaticData,
        getSubaccountProfile,
      });
    const { name: toSubaccountName, username: toSubaccountUsername } =
      getNormalizedSubaccountInfo({
        subaccount: recipient,
        allMarketsStaticData,
        getSubaccountProfile,
      });

    return {
      fromSubaccountName,
      toSubaccountName,
      fromSubaccountUsername,
      toSubaccountUsername,
    };
  })();

  return {
    token: metadata,
    eventType,
    timestampMillis: secondsToMilliseconds(event.timestamp.toNumber()),
    valueUsd: size.times(oraclePrice).times(primaryQuotePriceUsd),
    size,
    isProcessing,
    hasWithdrawPoolLiquidity,
    submissionIndex: event.submissionIndex,
    amount,
    productId,
    transferEventData,
  };
}

interface GetNormalizedSubaccountInfoParams {
  subaccount: string;
  allMarketsStaticData: AllMarketsStaticDataForChainEnv | undefined;
  getSubaccountProfile: (subaccountName: string) => SubaccountProfile;
}

function getNormalizedSubaccountInfo({
  subaccount,
  allMarketsStaticData,
  getSubaccountProfile,
}: GetNormalizedSubaccountInfoParams) {
  const subaccountName = subaccountFromHex(subaccount).subaccountName;

  if (isIsoSubaccountHex(subaccount)) {
    const productId = getIsoSubaccountProductId(subaccount);
    const marketName =
      allMarketsStaticData?.perp[productId]?.metadata.marketName;

    return {
      name: subaccountName,
      username: marketName ? `${marketName} (Iso)` : 'Isolated',
    };
  }

  return {
    name: subaccountName,
    username: getSubaccountProfile(subaccountName).username,
  };
}

/**
 * Subaccounts are in hex and include the isolated product id
 *
 * | address | reserved | productId | id | 'iso' |
 *
 * | 20 bytes | 6 bytes | 2 bytes | 1 byte | 3 bytes |
 *
 * @param subaccount
 * @returns `productId` of the isolated subaccount market
 */
function getIsoSubaccountProductId(subaccount: string) {
  return parseInt(toBytes(subaccount).slice(27, 29).toString());
}
