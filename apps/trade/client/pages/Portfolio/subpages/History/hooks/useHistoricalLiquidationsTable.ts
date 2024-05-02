import {
  calcLpTokenValue,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountLiquidationEventsResponse,
  IndexerLiquidationEvent,
} from '@vertex-protocol/indexer-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSubaccountPaginatedLiquidationEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedLiquidationEvents';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import {
  CustomNumberFormatSpecifier,
  NumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { BaseProductMetadata, Token } from 'common/productMetadata/types';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export type HistoricalLiquidatedBalanceType = 'spot' | 'perp' | 'lp';

export interface HistoricalLiquidatedBalance {
  type: ProductEngineType;
  baseMetadata: BaseProductMetadata;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: NumberFormatSpecifier | string;
  sizeFormatSpecifier: NumberFormatSpecifier | string;
  // For position changes
  signedSizeFormatSpecifier: NumberFormatSpecifier | string;
  // Decimal adjusted
  amountLiquidated: BigDecimal;
  liquidatedValueUsd: BigDecimal;
}

export interface HistoricalLiquidationDecomposedLp {
  type: ProductEngineType;
  baseMetadata: BaseProductMetadata;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: NumberFormatSpecifier | string;
  sizeFormatSpecifier: NumberFormatSpecifier | string;
  // For position changes
  signedSizeFormatSpecifier: NumberFormatSpecifier | string;
  // Used for rendering LPs
  quoteToken: Token;
  // Decimal adjusted
  amountLpDecomposed: BigDecimal;
  lpValueUsd: BigDecimal;
  underlyingBalanceDelta: BigDecimal;
}

export interface HistoricalLiquidationEvent {
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
  const quotePriceUsd = useQuotePriceUsd();

  const {
    data: subaccountPaginatedEvents,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSubaccountPaginatedLiquidationEvents({
    pageSize: PAGE_SIZE,
  });

  const { pageCount, paginationState, setPaginationState, getPageData } =
    useDataTablePagination<
      GetIndexerSubaccountLiquidationEventsResponse,
      IndexerLiquidationEvent
    >({
      queryPageCount: subaccountPaginatedEvents?.pages.length,
      pageSize: PAGE_SIZE,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData = useMemo((): HistoricalLiquidationEvent[] | undefined => {
    if (!subaccountPaginatedEvents || !allMarketsStaticData) {
      return;
    }

    const quoteToken = allMarketsStaticData.quote.metadata.token;

    return getPageData(subaccountPaginatedEvents)
      .map((event): HistoricalLiquidationEvent | undefined => {
        const { lps, spot, quote, perp, timestamp } = event;
        const liquidatedBalanceTypes: Set<HistoricalLiquidatedBalanceType> =
          new Set();

        // Process decomposed lps
        const decomposedLps = lps
          .map(
            (decomposedLp): HistoricalLiquidationDecomposedLp | undefined => {
              const productId = decomposedLp.indexerEvent.productId;
              const metadataForProduct =
                allMarketsStaticData.all[productId]?.metadata;

              if (!metadataForProduct) {
                console.warn(
                  'Invalid liquidated LP balance - market not found.',
                );
                return;
              }

              const amountLpDecomposed = removeDecimals(
                decomposedLp.amountLpDecomposed,
              );
              const indexerEventMarket = decomposedLp.indexerEvent.state.market;

              return {
                type: indexerEventMarket.type,
                baseMetadata: getBaseProductMetadata(metadataForProduct),
                oraclePrice: indexerEventMarket.product.oraclePrice,
                priceFormatSpecifier: getMarketPriceFormatSpecifier(
                  indexerEventMarket.priceIncrement,
                ),
                sizeFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
                signedSizeFormatSpecifier:
                  CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO,
                quoteToken,
                amountLpDecomposed,
                lpValueUsd: amountLpDecomposed
                  .multipliedBy(
                    calcLpTokenValue(
                      decomposedLp.indexerEvent.state.market.product,
                    ),
                  )
                  .multipliedBy(quotePriceUsd),
                underlyingBalanceDelta: removeDecimals(
                  decomposedLp.underlyingBalanceDelta,
                ),
              };
            },
          )
          .filter(nonNullFilter);
        if (decomposedLps.length > 0) {
          liquidatedBalanceTypes.add('lp');
        }

        // Spot liquidation
        let spotLiquidation: HistoricalLiquidationEvent['spot'];
        if (spot) {
          const marketMetadata =
            allMarketsStaticData.spot[spot.indexerEvent.productId]?.metadata;

          if (!marketMetadata) {
            console.warn('Invalid liquidation event - spot market not found.');
            return;
          }

          const oraclePrice =
            spot.indexerEvent.state.market.product.oraclePrice;
          const amountLiquidated = removeDecimals(spot.amountLiquidated);

          const indexerEventMarket = spot.indexerEvent.state.market;

          spotLiquidation = {
            oraclePrice,
            priceFormatSpecifier: getMarketPriceFormatSpecifier(
              indexerEventMarket.priceIncrement,
            ),
            sizeFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            signedSizeFormatSpecifier:
              CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO,
            amountLiquidated,
            liquidatedValueUsd: amountLiquidated
              .multipliedBy(oraclePrice)
              .multipliedBy(quotePriceUsd),
            type: ProductEngineType.SPOT,
            baseMetadata: getBaseProductMetadata(marketMetadata),
          };
          liquidatedBalanceTypes.add('spot');
        }

        // Perp liquidation
        let perpLiquidation: HistoricalLiquidationEvent['perp'];
        if (perp) {
          const marketMetadata =
            allMarketsStaticData.perp[perp.indexerEvent.productId]?.metadata;
          if (!marketMetadata) {
            console.warn('Invalid liquidation event - perp market not found.');
            return;
          }

          const indexerEventMarket = perp.indexerEvent.state.market;
          const oraclePrice = indexerEventMarket.product.oraclePrice;
          const amountLiquidated = removeDecimals(perp.amountLiquidated);

          const marketSizeFormatSpecifier = getMarketSizeFormatSpecifier(
            indexerEventMarket.sizeIncrement,
          );

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
              .multipliedBy(quotePriceUsd),
            type: ProductEngineType.PERP,
            baseMetadata: getBaseProductMetadata(marketMetadata),
          };
          liquidatedBalanceTypes.add('perp');
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
          liquidatedBalanceTypes: Array.from(liquidatedBalanceTypes),
          decomposedLps,
          spot: spotLiquidation,
          perp: perpLiquidation,
          quoteBalanceDelta: removeDecimals(quoteBalanceDeltaWithDecimals),
          timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
        };
      })
      .filter(nonNullFilter);
  }, [
    subaccountPaginatedEvents,
    allMarketsStaticData,
    getPageData,
    quotePriceUsd,
  ]);

  return {
    isLoading: isLoading || isFetchingNextPage || marketsDataLoading,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
