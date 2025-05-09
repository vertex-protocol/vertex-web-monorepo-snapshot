import { SpotProductMetadata } from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { usePrimaryQuoteBalance } from 'client/hooks/subaccount/usePrimaryQuoteBalance';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { useMemo } from 'react';

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
    useSubaccountOverview();
  const { data: primaryQuoteBalance, isLoading: isPrimaryQuoteBalanceLoading } =
    usePrimaryQuoteBalance();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData: MarginManagerQuoteBalanceTableItem[] | undefined =
    useMemo(() => {
      if (!primaryQuoteBalance || !derivedOverview) {
        return;
      }

      const quoteTableItem = (() => {
        const unsettledQuoteUsd =
          derivedOverview.perp.cross.totalUnsettledQuote.multipliedBy(
            primaryQuotePriceUsd,
          );

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
    }, [derivedOverview, primaryQuoteBalance, primaryQuotePriceUsd]);

  return {
    balances: mappedData,
    isLoading: isDerivedOverviewLoading || isPrimaryQuoteBalanceLoading,
  };
}
