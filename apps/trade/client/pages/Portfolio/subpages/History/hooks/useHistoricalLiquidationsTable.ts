import {
  calcLpTokenValue,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountLiquidationEventsResponse,
  IndexerLiquidationEvent,
} from '@vertex-protocol/indexer-client';
import { SharedProductMetadata, Token } from '@vertex-protocol/react-client';
import {
  CustomNumberFormatSpecifier,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { AllMarketsStaticDataForChainEnv } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedLiquidationEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedLiquidationEvents';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export type HistoricalLiquidatedBalanceType =
  | 'spot'
  | 'perp_cross'
  | 'perp_isolated'
  | 'lp';

export interface HistoricalLiquidatedBalance {
  sharedMetadata: SharedProductMetadata;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: NumberFormatSpecifier | string;
  sizeFormatSpecifier: NumberFormatSpecifier | string;
  // For position changes
  signedSizeFormatSpecifier: NumberFormatSpecifier | string;
  // Decimal adjusted
  amountLiquidated: BigDecimal;
  liquidatedValueUsd: BigDecimal;
  liquidatedBalanceType: HistoricalLiquidatedBalanceType;
}

export interface HistoricalLiquidationDecomposedLp {
  type: ProductEngineType;
  sharedMetadata: SharedProductMetadata;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: NumberFormatSpecifier | string;
  sizeFormatSpecifier: NumberFormatSpecifier | string;
  // For position changes
  signedSizeFormatSpecifier: NumberFormatSpecifier | string;
  // Used for rendering LPs, which can only have primary quote as the quote ccy
  primaryQuoteToken: Token;
  // Decimal adjusted
  amountLpDecomposed: BigDecimal;
  lpValueUsd: BigDecimal;
  underlyingBalanceDelta: BigDecimal;
}

export interface HistoricalLiquidationsTableItem {
  submissionIndex: string;
  quoteBalanceDelta: BigDecimal;
  timestampMillis: number;
  decomposedLps: HistoricalLiquidationDecomposedLp[];
  spot?: HistoricalLiquidatedBalance;
  perp?: HistoricalLiquidatedBalance;
  liquidatedBalanceTypes: HistoricalLiquidatedBalanceType[];
}

const PAGE_SIZE = 10;

function extractItems(data: GetIndexerSubaccountLiquidationEventsResponse) {
  return data.events;
}

export function useHistoricalLiquidationsTable() {
  const { data: allMarketsStaticData, isLoading: marketsDataLoading } =
    useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const {
    data: subaccountPaginatedEvents,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedLiquidationEvents({
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountLiquidationEventsResponse,
    IndexerLiquidationEvent
  >({
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData = useMemo(():
    | HistoricalLiquidationsTableItem[]
    | undefined => {
    if (!subaccountPaginatedEvents || !allMarketsStaticData) {
      return;
    }

    return getPageData(subaccountPaginatedEvents)
      .map((event) => {
        return getHistoricalLiquidationsTableItem({
          event: event,
          allMarketsStaticData: allMarketsStaticData,
          primaryQuotePriceUsd: primaryQuotePriceUsd,
        });
      })
      .filter(nonNullFilter);
  }, [
    subaccountPaginatedEvents,
    allMarketsStaticData,
    getPageData,
    primaryQuotePriceUsd,
  ]);

  return {
    isLoading: isLoading || marketsDataLoading || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalLiquidationsTableItemParams {
  event: IndexerLiquidationEvent;
  allMarketsStaticData: AllMarketsStaticDataForChainEnv;
  primaryQuotePriceUsd: BigDecimal;
}

/**
 * Converts an indexer liquidation event into a histircal liquidations table item
 *
 * If we cannot resolve market data for a liquidated LP balance, it is not included in the resultant item
 * If we cannot resolve market data for a liquidated balance, null is returned instead of the item
 *
 * @param event
 * @param allMarketsStaticData
 * @param primaryQuotePriceUsd
 */
export function getHistoricalLiquidationsTableItem({
  event,
  allMarketsStaticData,
  primaryQuotePriceUsd,
}: GetHistoricalLiquidationsTableItemParams): HistoricalLiquidationsTableItem | null {
  const primaryQuoteToken =
    allMarketsStaticData.primaryQuoteProduct.metadata.token;
  const { lps, spot, quote, perp, timestamp } = event;
  const liquidatedBalanceTypes: Set<HistoricalLiquidatedBalanceType> =
    new Set();

  // Process decomposed lps
  const decomposedLps = lps
    .map((decomposedLp): HistoricalLiquidationDecomposedLp | null => {
      const productId = decomposedLp.indexerEvent.productId;
      const metadataForProduct =
        allMarketsStaticData.allMarkets[productId]?.metadata;

      if (!metadataForProduct) {
        console.warn(
          `[getHistoricalLiquidationsTableItem] Invalid liquidated LP balance - market ${productId} not found.`,
        );
        return null;
      }

      const amountLpDecomposed = removeDecimals(
        decomposedLp.amountLpDecomposed,
      );
      const indexerEventMarket = decomposedLp.indexerEvent.state.market;

      return {
        type: indexerEventMarket.type,
        sharedMetadata: getSharedProductMetadata(metadataForProduct),
        oraclePrice: indexerEventMarket.product.oraclePrice,
        priceFormatSpecifier: getMarketPriceFormatSpecifier(
          indexerEventMarket.priceIncrement,
        ),
        sizeFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
        signedSizeFormatSpecifier:
          CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO,
        primaryQuoteToken,
        amountLpDecomposed,
        lpValueUsd: amountLpDecomposed
          .multipliedBy(
            calcLpTokenValue(decomposedLp.indexerEvent.state.market.product),
          )
          .multipliedBy(primaryQuotePriceUsd),
        underlyingBalanceDelta: removeDecimals(
          decomposedLp.underlyingBalanceDelta,
        ),
      };
    })
    .filter(nonNullFilter);

  if (decomposedLps.length > 0) {
    liquidatedBalanceTypes.add('lp');
  }

  // Spot liquidation
  let spotLiquidation: HistoricalLiquidationsTableItem['spot'];
  if (spot) {
    const marketMetadata =
      allMarketsStaticData.spotMarkets[spot.indexerEvent.productId]?.metadata;

    if (!marketMetadata) {
      console.warn(
        `[getHistoricalLiquidationsTableItem] Invalid liquidated event - spot market ${spot.indexerEvent.productId} not found.`,
      );
      return null;
    }

    const oraclePrice = spot.indexerEvent.state.market.product.oraclePrice;
    const amountLiquidated = removeDecimals(spot.amountLiquidated);

    const indexerEventMarket = spot.indexerEvent.state.market;

    spotLiquidation = {
      oraclePrice,
      priceFormatSpecifier: getMarketPriceFormatSpecifier(
        indexerEventMarket.priceIncrement,
      ),
      sizeFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
      signedSizeFormatSpecifier: CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO,
      amountLiquidated,
      liquidatedValueUsd: amountLiquidated
        .multipliedBy(oraclePrice)
        .multipliedBy(primaryQuotePriceUsd),
      liquidatedBalanceType: 'spot',
      sharedMetadata: getSharedProductMetadata(marketMetadata),
    };
    liquidatedBalanceTypes.add('spot');
  }

  // Perp liquidation
  let perpLiquidation: HistoricalLiquidationsTableItem['perp'];
  if (perp) {
    const marketMetadata =
      allMarketsStaticData.perpMarkets[perp.indexerEvent.productId]?.metadata;
    if (!marketMetadata) {
      console.warn(
        `[getHistoricalLiquidationsTableItem] Invalid liquidated event - perp market ${perp.indexerEvent.productId} not found.`,
      );
      return null;
    }

    const indexerEventMarket = perp.indexerEvent.state.market;
    const oraclePrice = indexerEventMarket.product.oraclePrice;
    const amountLiquidated = removeDecimals(perp.amountLiquidated);

    const marketSizeFormatSpecifier = getMarketSizeFormatSpecifier(
      indexerEventMarket.sizeIncrement,
    );

    const liquidatedBalanceType = perp.indexerEvent.isolated
      ? 'perp_isolated'
      : 'perp_cross';

    perpLiquidation = {
      oraclePrice,
      priceFormatSpecifier: getMarketPriceFormatSpecifier(
        indexerEventMarket.priceIncrement,
      ),
      sizeFormatSpecifier: marketSizeFormatSpecifier,
      signedSizeFormatSpecifier: `+${marketSizeFormatSpecifier}`,
      amountLiquidated,
      liquidatedValueUsd: amountLiquidated
        .multipliedBy(oraclePrice)
        .multipliedBy(primaryQuotePriceUsd),
      liquidatedBalanceType,
      sharedMetadata: getSharedProductMetadata(marketMetadata),
    };

    liquidatedBalanceTypes.add(liquidatedBalanceType);
  }

  // For quote payment, also bundle in vQuoteDelta changes as a result of perp liquidations
  let quoteBalanceDeltaWithDecimals = quote.balanceDelta;
  if (perp) {
    quoteBalanceDeltaWithDecimals = quoteBalanceDeltaWithDecimals.plus(
      perp.indexerEvent.state.postBalance.vQuoteBalance.minus(
        perp.indexerEvent.state.preBalance.vQuoteBalance,
      ),
    );
  }

  return {
    submissionIndex: event.submissionIndex,
    liquidatedBalanceTypes: Array.from(liquidatedBalanceTypes),
    decomposedLps,
    spot: spotLiquidation,
    perp: perpLiquidation,
    quoteBalanceDelta: removeDecimals(quoteBalanceDeltaWithDecimals),
    timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
  };
}
