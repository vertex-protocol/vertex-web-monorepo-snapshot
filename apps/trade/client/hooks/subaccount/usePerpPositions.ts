import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  calcPerpBalanceNotionalValue,
  calcPerpBalanceValue,
  isPerpBalance,
} from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/useSubaccountSummary';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { QueryState } from 'client/types/QueryState';
import { calcEstimatedLiquidationPrice } from 'client/utils/calcs/calcEstimatedLiquidationPrice';
import { calcPositionMarginWithoutPnl } from 'client/utils/calcs/calcPositionMarginWithoutPnl';
import {
  calcPerpBalanceHealth,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { calcIndexerUnrealizedPerpEntryCost } from 'client/utils/calcs/perpEntryCostCalcs';
import {
  calcIndexerSummaryUnrealizedPnl,
  calcPnlFrac,
} from 'client/utils/calcs/pnlCalcs';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import { safeDiv } from 'client/utils/safeDiv';
import {
  AnnotatedPerpBalanceWithProduct,
  PerpProductMetadata,
} from '@vertex-protocol/metadata';

export interface PerpPositionItem {
  metadata: PerpProductMetadata;
  productId: number;
  amount: BigDecimal;
  price: {
    averageEntryPrice: BigDecimal;
    // Latest oracle price from the indexer, not from clearinghouse state
    fastOraclePriceUsd: BigDecimal;
    fastOraclePrice: BigDecimal;
  };
  notionalValueUsd: BigDecimal;
  netFunding: BigDecimal;
  unsettledQuoteAmount: BigDecimal;
  // Calculated with current market prices
  estimatedPnlUsd: BigDecimal;
  estimatedPnlFrac: BigDecimal;
  marginUsedUsd: BigDecimal;
  estimatedLiquidationPrice: BigDecimal | null;
  healthMetrics: InitialMaintMetrics;
}

function perpPositionsQueryKey(
  // Update times for important queries
  dataUpdateTimes: number[],
  hasOraclePriceData: boolean,
  hasMarketPriceData: boolean,
) {
  return createQueryKey(
    'perpPositions',
    dataUpdateTimes,
    hasOraclePriceData,
    hasMarketPriceData,
  );
}

export function usePerpPositions(): QueryState<PerpPositionItem[]> {
  const {
    data: subaccountSummary,
    dataUpdatedAt,
    ...rest
  } = useSubaccountSummary();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  // Used for unrealized pnl, silently fail if not available
  const { data: indexerSnapshot, dataUpdatedAt: indexerSnapshotUpdatedAt } =
    useSubaccountIndexerSnapshot();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const disabled = !subaccountSummary;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    return subaccountSummary.balances
      .filter(isPerpBalance)
      .map((balance): PerpPositionItem => {
        const balanceWithProduct = balance as AnnotatedPerpBalanceWithProduct;
        const indexerSnapshotBalance = indexerSnapshot?.balances.find(
          (indexerBalance) => {
            return indexerBalance.productId === balanceWithProduct.productId;
          },
        );
        const metadata = balanceWithProduct.metadata;

        const productLatestMarketPrices =
          latestMarketPrices?.[balanceWithProduct.productId];

        const oraclePrice =
          latestOraclePrices?.[balanceWithProduct.productId]?.oraclePrice ??
          balanceWithProduct.oraclePrice;

        const decimalAdjustedSize = removeDecimals(balanceWithProduct.amount);

        const balanceNotionalValue =
          calcPerpBalanceNotionalValue(balanceWithProduct);
        const balanceValue = calcPerpBalanceValue(balanceWithProduct);

        const {
          netFunding,
          unrealizedPnl,
          unrealizedPnlFrac,
          averageEntryPrice,
        } = (() => {
          if (!indexerSnapshotBalance) {
            return {
              unrealizedPnl: BigDecimals.ZERO,
              unrealizedPnlFrac: BigDecimals.ZERO,
              netFunding: BigDecimals.ZERO,
              averageEntryPrice: BigDecimals.ZERO,
            };
          }

          const indexerBalanceAmount =
            indexerSnapshotBalance.state.postBalance.amount;

          const netEntryUnrealized =
            indexerSnapshotBalance.trackedVars.netEntryUnrealized;

          const averageEntryPrice = safeDiv(
            netEntryUnrealized,
            indexerBalanceAmount,
          ).abs();

          // If current amount is positive, use ask since we are selling & vice versa,
          const estimatedExitPrice = balanceWithProduct.amount.isPositive()
            ? productLatestMarketPrices?.safeAsk
            : productLatestMarketPrices?.safeBid;

          const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
            indexerSnapshotBalance,
            estimatedExitPrice ?? oraclePrice, // fallback to oraclePrice
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

        const healthMetrics = calcPerpBalanceHealth(balanceWithProduct);

        return {
          metadata,
          netFunding,
          notionalValueUsd:
            removeDecimals(balanceNotionalValue).multipliedBy(
              primaryQuotePriceUsd,
            ),
          amount: decimalAdjustedSize,
          unsettledQuoteAmount: removeDecimals(balanceValue),
          estimatedPnlUsd: unrealizedPnl.multipliedBy(primaryQuotePriceUsd),
          estimatedPnlFrac: unrealizedPnlFrac,
          productId: balance.productId,
          price: {
            fastOraclePriceUsd: oraclePrice.multipliedBy(primaryQuotePriceUsd),
            fastOraclePrice: oraclePrice,
            averageEntryPrice,
          },
          estimatedLiquidationPrice: calcEstimatedLiquidationPrice(
            balanceWithProduct,
            subaccountSummary.health.maintenance.health,
          ),
          marginUsedUsd: removeDecimals(
            calcPositionMarginWithoutPnl(balanceWithProduct),
          ).multipliedBy(primaryQuotePriceUsd),
          healthMetrics: {
            initial: removeDecimals(healthMetrics.initial),
            maintenance: removeDecimals(healthMetrics.maintenance),
          },
        };
      });
  };

  const { data: mappedData } = useQuery({
    queryKey: perpPositionsQueryKey(
      [dataUpdatedAt, indexerSnapshotUpdatedAt],
      !!latestOraclePrices,
      !!latestMarketPrices,
    ),
    queryFn,
    enabled: !disabled,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
  });

  return {
    data: mappedData,
    ...rest,
  };
}
