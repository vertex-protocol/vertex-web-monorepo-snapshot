import { useMemo } from 'react';
import { BigDecimal } from '@vertex-protocol/utils';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { BigDecimals } from 'client/utils/BigDecimals';
import { useQuoteBalance } from 'client/hooks/subaccount/useQuoteBalance';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { MarginWeightMetrics } from '../../types';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';

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
  const { data: derivedOverview, isLoading: derivedSubbaccountLoading } =
    useDerivedSubaccountOverview();
  const { data: quoteBalance, isLoading: quoteBalanceLoading } =
    useQuoteBalance();
  const quotePrice = useQuotePriceUsd();

  const mappedData: MarginManagerQuoteBalanceTableItem[] | undefined =
    useMemo(() => {
      if (!quoteBalance || !derivedOverview) {
        return;
      }

      const quoteTableItem = (() => {
        const unsettledQuoteUsd =
          derivedOverview.perp.totalUnsettledQuote.multipliedBy(quotePrice);

        const balanceValueUsd = quoteBalance.amount.multipliedBy(
          quoteBalance.oraclePriceUsd,
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
          productId: quoteBalance.productId,
          metadata: quoteBalance.metadata,
          balanceAmount: quoteBalance.amount,
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
    }, [derivedOverview, quoteBalance, quotePrice]);

  return {
    balances: mappedData,
    isLoading: derivedSubbaccountLoading || quoteBalanceLoading,
  };
}
