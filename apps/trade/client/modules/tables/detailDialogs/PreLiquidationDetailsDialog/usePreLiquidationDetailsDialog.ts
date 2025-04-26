import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  calcIndexerLpBalanceValue,
  calcIndexerPerpBalanceValue,
} from '@vertex-protocol/indexer-client';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  removeDecimals,
  toPrintableObject,
} from '@vertex-protocol/utils';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import {
  PerpStaticMarketData,
  SpotStaticMarketData,
} from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshotsAtTimes } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshotsAtTimes';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { millisecondsToSeconds } from 'date-fns';
import { first } from 'lodash';
import { useMemo } from 'react';

interface PreLiquidationBalance {
  iconSrc: NextImageSrc;
  productId: number;
  productName: string;
  symbol: string;
  balanceAmount: BigDecimal;
  oraclePrice: BigDecimal;
  priceFormatSpecifier: string;
  marginModeType: MarginModeType;
}

interface PreLiquidationSpotBalance extends PreLiquidationBalance {
  balanceValueUsd: BigDecimal;
  lpBalanceValueUsd: BigDecimal;
  isolatedPerpProduct: PerpStaticMarketData | undefined;
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
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
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
      const { productId, state, isolated, isolatedProductId } = balance;

      const marketData = getStaticMarketDataForProductId<SpotStaticMarketData>(
        productId,
        allMarketsStaticData,
      );
      if (!marketData) {
        return;
      }

      const marketMetadata = getSharedProductMetadata(marketData.metadata);
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
        marginModeType: isolated ? 'isolated' : 'cross',
      };

      if (state.type === ProductEngineType.SPOT) {
        const balanceValue = balanceAmount.times(oraclePrice);
        const lpBalanceValue = removeDecimals(
          calcIndexerLpBalanceValue(state.postBalance, state.market),
        );

        const isolatedPerpProduct = isolatedProductId
          ? allMarketsStaticData.perpMarkets[isolatedProductId]
          : undefined;

        spotBalances.push({
          ...commonBalanceProperties,
          balanceValueUsd: balanceValue.multipliedBy(primaryQuotePriceUsd),
          lpBalanceValueUsd: lpBalanceValue.multipliedBy(primaryQuotePriceUsd),
          isolatedPerpProduct,
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
            removeDecimals(unrealizedPnl).multipliedBy(primaryQuotePriceUsd),
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
  }, [allMarketsStaticData, primaryQuotePriceUsd, snapshot]);

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
