import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  calcIndexerLpBalanceValue,
  calcIndexerPerpBalanceValue,
} from '@vertex-protocol/indexer-client';
import { BigDecimal, toPrintableObject } from '@vertex-protocol/utils';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSubaccountIndexerSnapshotsAtTimes } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshotsAtTimes';
import { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { millisecondsToSeconds } from 'date-fns';
import { first, get } from 'lodash';
import { useMemo } from 'react';

interface PreLiquidationBalance {
  iconSrc: NextImageSrc;
  productId: number;
  productName: string;
  symbol: string;
  balanceAmount: BigDecimal;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: string;
}

interface PreLiquidationSpotBalance extends PreLiquidationBalance {
  balanceValueUsd: BigDecimal;
  lpBalanceValueUsd: BigDecimal;
}

interface PreLiquidationPerpBalance extends PreLiquidationBalance {
  unrealizedPnlUsd: BigDecimal;
  unsettledQuote: BigDecimal;
  sizeFormatSpecifier: string;
}

interface UsePreLiquidationDetailsDialog {
  isLoading: boolean;
  isError: boolean;
  spotBalances: PreLiquidationSpotBalance[] | undefined;
  perpBalances: PreLiquidationPerpBalance[] | undefined;
  rawJsonData: string | undefined;
}

export function usePreLiquidationDetailsDialog({
  liquidationTimestampMillis,
}: PreLiquidationDetailsDialogParams) {
  const quotePriceUsd = useQuotePriceUsd();
  const {
    data: allMarketsStaticData,
    isLoading: isLoadingMarketData,
    isError: isMarketDataError,
  } = useAllMarketsStaticData();

  // Subtract 1 second to ensure we get the snapshot before the liquidation
  const snapshotTimestamp =
    millisecondsToSeconds(liquidationTimestampMillis) - 1;

  const {
    data: snapshots,
    isLoading,
    isError,
  } = useSubaccountIndexerSnapshotsAtTimes([snapshotTimestamp]);
  const snapshot = first(snapshots);

  const balances = useMemo((): Pick<
    UsePreLiquidationDetailsDialog,
    'spotBalances' | 'perpBalances'
  > => {
    if (!snapshot || !allMarketsStaticData) {
      return {
        spotBalances: undefined,
        perpBalances: undefined,
      };
    }

    const spotBalances: PreLiquidationSpotBalance[] = [];
    const perpBalances: PreLiquidationPerpBalance[] = [];

    snapshot.balances.forEach((balance) => {
      const { productId, state } = balance;

      const marketData =
        productId === QUOTE_PRODUCT_ID
          ? allMarketsStaticData.quote
          : get(allMarketsStaticData.all, productId, undefined);
      if (!marketData) return;

      const marketMetadata = getBaseProductMetadata(marketData.metadata);
      const balanceAmount = removeDecimals(state.postBalance.amount);
      const oraclePrice = state.market.product.oraclePrice;
      const priceFormatSpecifier = getMarketPriceFormatSpecifier(
        marketData.priceIncrement,
      );

      if (balanceAmount.isZero() && state.postBalance.amount.isZero()) {
        return;
      }

      const commonBalanceProperties: PreLiquidationBalance = {
        productId,
        priceFormatSpecifier,
        productName:
          state.type === ProductEngineType.SPOT
            ? marketMetadata.symbol
            : marketData.metadata.marketName,
        symbol: marketMetadata.symbol,
        iconSrc: marketMetadata.icon.asset,
        balanceAmount,
        oraclePrice,
      };

      if (state.type === ProductEngineType.SPOT) {
        const balanceValue = balanceAmount.times(oraclePrice);
        const lpBalanceValue = removeDecimals(
          calcIndexerLpBalanceValue(state.postBalance, state.market),
        );

        spotBalances.push({
          ...commonBalanceProperties,
          balanceValueUsd: balanceValue.multipliedBy(quotePriceUsd),
          lpBalanceValueUsd: lpBalanceValue.multipliedBy(quotePriceUsd),
        });
      } else {
        const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(balance);
        const unsettledQuote = calcIndexerPerpBalanceValue(
          state.postBalance,
          oraclePrice,
        );

        perpBalances.push({
          ...commonBalanceProperties,
          unrealizedPnlUsd:
            removeDecimals(unrealizedPnl).multipliedBy(quotePriceUsd),
          unsettledQuote: removeDecimals(unsettledQuote),
          sizeFormatSpecifier: getMarketSizeFormatSpecifier(
            marketData.sizeIncrement,
          ),
        });
      }
    });

    return {
      spotBalances,
      perpBalances,
    };
  }, [allMarketsStaticData, quotePriceUsd, snapshot]);

  const rawJsonData = useMemo(() => {
    if (!snapshots) return;

    return JSON.stringify(toPrintableObject(snapshot), null, 2);
  }, [snapshot, snapshots]);

  return {
    isLoading: isLoading || isLoadingMarketData,
    isError: isError || isMarketDataError,
    rawJsonData,
    ...balances,
  };
}
