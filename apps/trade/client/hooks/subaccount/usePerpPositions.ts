import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Subaccount } from '@vertex-protocol/client';
import {
  BalanceHealthContributions,
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  isPerpBalance,
} from '@vertex-protocol/contracts';
import {
  AnnotatedPerpBalanceWithProduct,
  AnnotatedSpotBalanceWithProduct,
  createQueryKey,
  PerpProductMetadata,
  QueryDisabledError,
  REACT_QUERY_CONFIG,
} from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { safeDiv } from '@vertex-protocol/web-common';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { QueryState } from 'client/types/QueryState';
import {
  calcPerpBalanceHealthWithoutPnl,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { calcCrossPositionMarginWithoutPnl } from 'client/utils/calcs/perp/calcCrossPositionMarginWithoutPnl';
import { calcIsoPositionLeverage } from 'client/utils/calcs/perp/calcIsoPositionLeverage';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/perp/calcIsoPositionNetMargin';
import { calcEstimatedLiquidationPriceFromBalance } from 'client/utils/calcs/perp/liquidationPriceCalcs';
import { calcIndexerUnrealizedPerpEntryCost } from 'client/utils/calcs/perp/perpEntryCostCalcs';
import {
  calcIndexerSummaryUnrealizedPnl,
  calcPnlFrac,
} from 'client/utils/calcs/pnlCalcs';
import { getEstimatedExitPrice } from 'client/utils/getEstimatedExitPrice';

export interface PerpPositionItemIsoData {
  // Subaccount for the isolated position
  subaccountName: string;
  // Total margin deposited for the isolated position
  totalMargin: BigDecimal;
  // Total margin + unsettled quote
  netMargin: BigDecimal;
  // Leverage for the isolated position = total notional / net margin
  leverage: number;
}

export interface PerpPositionItem {
  metadata: PerpProductMetadata;
  productId: number;
  amount: BigDecimal;
  price: {
    averageEntryPrice: BigDecimal | undefined;
    // If available, the latest oracle price from the indexer. Defaults to the "slow" oracle price in the clearinghouse state
    fastOraclePriceUsd: BigDecimal;
    fastOraclePrice: BigDecimal;
  };
  notionalValueUsd: BigDecimal;
  netFunding: BigDecimal | undefined;
  unsettledQuoteAmount: BigDecimal;
  // Calculated with current market prices
  estimatedPnlUsd: BigDecimal | undefined;
  estimatedPnlFrac: BigDecimal | undefined;
  // Not defined for an iso position
  crossMarginUsedUsd: BigDecimal | undefined;
  estimatedLiquidationPrice: BigDecimal | null;
  healthMetrics: InitialMaintMetrics;
  // Defined if the position is an isolated position
  iso: PerpPositionItemIsoData | undefined;
}

function perpPositionsQueryKey(
  subaccount: AppSubaccount,
  // Update times for important queries
  dataUpdateTimes: number[],
  hasOraclePricesData: boolean,
  hasMarketPricesData: boolean,
) {
  return createQueryKey(
    'perpPositions',
    subaccount,
    dataUpdateTimes,
    hasOraclePricesData,
    hasMarketPricesData,
  );
}

// Common interface used for processing iso / cross positions
interface PerpPositionToProcess extends AnnotatedPerpBalanceWithProduct {
  iso?: {
    subaccount: Subaccount;
    healths: BalanceHealthContributions;
    quoteBalance: AnnotatedSpotBalanceWithProduct;
  };
}

export function usePerpPositions(): QueryState<PerpPositionItem[]> {
  const { currentSubaccount } = useSubaccountContext();

  const {
    data: subaccountSummary,
    dataUpdatedAt: subaccountSummaryDataUpdatedAt,
    isLoading: isLoadingSubaccountSummary,
    isError: isSubaccountSummaryError,
  } = useSubaccountSummary();
  const {
    data: isolatedPositions,
    dataUpdatedAt: isolatedPositionsDataUpdatedAt,
    isLoading: isLoadingIsolatedPositions,
    isError: isIsolatedPositionsError,
  } = useSubaccountIsolatedPositions();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  // Used for unrealized pnl, silently fail if not available
  const { data: indexerSnapshot, dataUpdatedAt: indexerSnapshotUpdatedAt } =
    useSubaccountIndexerSnapshot();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const disabled = !subaccountSummary || !isolatedPositions;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const crossPerpBalances: PerpPositionToProcess[] =
      subaccountSummary.balances.filter(
        isPerpBalance,
      ) as PerpPositionToProcess[];

    const isoPerpBalances = isolatedPositions.map(
      (isoPosition): PerpPositionToProcess => {
        return {
          ...isoPosition.baseBalance,
          iso: {
            quoteBalance: isoPosition.quoteBalance,
            subaccount: isoPosition.subaccount,
            healths: isoPosition.healths,
          },
        };
      },
    );

    return [...crossPerpBalances, ...isoPerpBalances].map(
      (position): PerpPositionItem => {
        const isIso = !!position.iso;
        const productId = position.productId;
        const metadata = position.metadata;
        const slowOraclePrice = position.oraclePrice;
        const amount = position.amount;

        const indexerSnapshotBalance = indexerSnapshot?.balances.find(
          (indexerBalance) => {
            const matchesMarginMode = indexerBalance.isolated === isIso;
            return indexerBalance.productId === productId && matchesMarginMode;
          },
        );

        const productLatestMarketPrices = latestMarketPrices?.[productId];

        const oraclePrice =
          latestOraclePrices?.[productId]?.oraclePrice ?? slowOraclePrice;

        const decimalAdjustedAmount = removeDecimals(amount);
        const decimalAdjustedNotionalValue = removeDecimals(
          calcPerpBalanceNotionalValue(position),
        );
        const decimalAdjustedUnsettledQuoteAmount = removeDecimals(
          calcPerpBalanceValue(position),
        );

        const {
          netFunding,
          unrealizedPnl,
          unrealizedPnlFrac,
          averageEntryPrice,
        } = (() => {
          if (!indexerSnapshotBalance) {
            return {};
          }

          const indexerBalanceAmount =
            indexerSnapshotBalance.state.postBalance.amount;

          const netEntryUnrealized =
            indexerSnapshotBalance.trackedVars.netEntryUnrealized;

          const averageEntryPrice = safeDiv(
            netEntryUnrealized,
            indexerBalanceAmount,
          ).abs();

          const estimatedExitPrice =
            getEstimatedExitPrice(
              amount.isPositive(),
              productLatestMarketPrices,
            ) ?? oraclePrice;

          const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
            indexerSnapshotBalance,
            estimatedExitPrice,
          );

          const unrealizedPnlFrac = calcPnlFrac(
            unrealizedPnl,
            calcIndexerUnrealizedPerpEntryCost(indexerSnapshotBalance),
          );

          return {
            netFunding: removeDecimals(
              indexerSnapshotBalance.trackedVars.netFundingUnrealized,
            ),
            unrealizedPnl: removeDecimals(unrealizedPnl),
            unrealizedPnlFrac,
            averageEntryPrice,
          };
        })();

        const healthMetrics = calcPerpBalanceHealthWithoutPnl(position);

        const iso: PerpPositionItemIsoData | undefined = (() => {
          if (!position.iso) {
            return;
          }

          const totalMargin = removeDecimals(position.iso.quoteBalance.amount);
          const netMargin = removeDecimals(
            calcIsoPositionNetMargin(position, position.iso.quoteBalance),
          );

          return {
            subaccountName: position.iso.subaccount.subaccountName,
            totalMargin,
            netMargin,
            leverage: calcIsoPositionLeverage(
              netMargin,
              decimalAdjustedNotionalValue,
            ).toNumber(),
          };
        })();

        const estimatedLiquidationPrice =
          calcEstimatedLiquidationPriceFromBalance(
            position,
            position.iso
              ? position.iso.healths.maintenance
              : subaccountSummary.health.maintenance.health,
          );
        const crossMarginUsedUsd = !isIso
          ? removeDecimals(
              calcCrossPositionMarginWithoutPnl(position),
            ).multipliedBy(primaryQuotePriceUsd)
          : undefined;

        return {
          metadata,
          netFunding,
          notionalValueUsd:
            decimalAdjustedNotionalValue.multipliedBy(primaryQuotePriceUsd),
          amount: decimalAdjustedAmount,
          unsettledQuoteAmount: decimalAdjustedUnsettledQuoteAmount,
          estimatedPnlUsd: unrealizedPnl?.multipliedBy(primaryQuotePriceUsd),
          estimatedPnlFrac: unrealizedPnlFrac,
          productId,
          price: {
            fastOraclePriceUsd: oraclePrice.multipliedBy(primaryQuotePriceUsd),
            fastOraclePrice: oraclePrice,
            averageEntryPrice,
          },
          estimatedLiquidationPrice,
          crossMarginUsedUsd,
          healthMetrics: {
            initial: removeDecimals(healthMetrics.initial),
            maintenance: removeDecimals(healthMetrics.maintenance),
          },
          iso,
        };
      },
    );
  };

  const {
    data: mappedData,
    isLoading: isLoadingPerpPositions,
    isError: isPerpPositionsError,
  } = useQuery({
    queryKey: perpPositionsQueryKey(
      currentSubaccount,
      [
        subaccountSummaryDataUpdatedAt,
        isolatedPositionsDataUpdatedAt,
        indexerSnapshotUpdatedAt,
      ],
      !!latestOraclePrices,
      !!latestMarketPrices,
    ),
    queryFn,
    enabled: !disabled,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });

  return {
    data: mappedData,
    isLoading:
      isLoadingPerpPositions ||
      isLoadingSubaccountSummary ||
      isLoadingIsolatedPositions,
    isError:
      isPerpPositionsError ||
      isSubaccountSummaryError ||
      isIsolatedPositionsError,
  };
}
