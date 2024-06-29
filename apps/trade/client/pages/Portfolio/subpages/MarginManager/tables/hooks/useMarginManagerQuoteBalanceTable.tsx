import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { usePrimaryQuoteBalance } from 'client/hooks/subaccount/usePrimaryQuoteBalance';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';
import { MarginWeightMetrics } from '../../types';

export interface MarginManagerQuoteBalanceTableItem {
  productId: number;
  metadata: SpotProductMetadata;
  unsettledQuoteUsd: BigDecimal;
  netBalanceUsd: BigDecimal;
  balanceValueUsd: BigDecimal;
  balanceAmount: BigDecimal;
  initialHealth: MarginWeightMetrics;
  maintenanceHealth: MarginWeightMetrics;
}

export function useMarginManagerQuoteBalanceTable() {
  const { data: derivedOverview, isLoading: isDerivedOverviewLoading } =
    useDerivedSubaccountOverview();
  const { data: primaryQuoteBalance, isLoading: isPrimaryQuoteBalanceLoading } =
    usePrimaryQuoteBalance();
  const quotePrice = usePrimaryQuotePriceUsd();

  const mappedData: MarginManagerQuoteBalanceTableItem[] | undefined =
    useMemo(() => {
      if (!primaryQuoteBalance || !derivedOverview) {
        return;
      }

      const quoteTableItem = (() => {
        const unsettledQuoteUsd =
          derivedOverview.perp.totalUnsettledQuote.multipliedBy(quotePrice);

        const balanceValueUsd = primaryQuoteBalance.amount.multipliedBy(
          primaryQuoteBalance.oraclePriceUsd,
        );

        const netBalanceUsd = unsettledQuoteUsd.plus(balanceValueUsd);

        // return net balance is zero and cash balance is zero.
        if (
          netBalanceUsd.eq(BigDecimals.ZERO) &&
          balanceValueUsd.eq(BigDecimals.ZERO)
        ) {
          return;
        }

        return {
          productId: primaryQuoteBalance.productId,
          metadata: primaryQuoteBalance.metadata,
          balanceAmount: primaryQuoteBalance.amount,
          unsettledQuoteUsd,
          netBalanceUsd,
          balanceValueUsd,
          initialHealth: {
            marginUsd: netBalanceUsd,
            weight: BigDecimals.ONE,
          },
          maintenanceHealth: {
            marginUsd: netBalanceUsd,
            weight: BigDecimals.ONE,
          },
        };
      })();

      return quoteTableItem ? [quoteTableItem] : undefined;
    }, [derivedOverview, primaryQuoteBalance, quotePrice]);

  return {
    balances: mappedData,
    isLoading: isDerivedOverviewLoading || isPrimaryQuoteBalanceLoading,
  };
}
