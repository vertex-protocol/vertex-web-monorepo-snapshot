import {
  BigDecimals,
  removeDecimals,
  VLP_PRODUCT_ID,
} from '@vertex-protocol/client';
import { useVlp7dSnapshots } from 'client/pages/Vlp/hooks/useVlp7dSnapshots';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useMemo } from 'react';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import {
  calcIndexerSummaryCumulativePnl,
  calcIndexerSummaryUnrealizedPnl,
} from 'client/utils/calcs/pnlCalcs';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { safeDiv } from '@vertex-protocol/web-common';

function isVlpBalance(balance: { productId: number }) {
  return balance.productId === VLP_PRODUCT_ID;
}

export function useVlpPositionCard() {
  // we use 7d snapshots here as we only interested in latest
  // so we can share query with other 7d consumers (eg. HeaderMetrics)
  const { data: vlpSnapshots } = useVlp7dSnapshots();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();
  const { balances } = useSpotBalances();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  return useMemo(() => {
    const vlpBalance = balances?.find(isVlpBalance);
    if (!vlpSnapshots || !vlpBalance || !indexerSnapshot) {
      return {};
    }

    const vlpSnapshot = vlpSnapshots.latest;
    const vlpBalanceSnapshot = indexerSnapshot.balances.find(isVlpBalance);

    const balanceAmount = vlpBalance.amount;

    const balanceValueUsd = balanceAmount
      .multipliedBy(vlpSnapshot.oraclePrice)
      .multipliedBy(primaryQuotePriceUsd);

    const shareOfPool = safeDiv(balanceAmount, removeDecimals(vlpSnapshot.tvl));

    const totalPnlUsd = vlpBalanceSnapshot
      ? removeDecimals(
          calcIndexerSummaryCumulativePnl(vlpBalanceSnapshot),
        ).multipliedBy(primaryQuotePriceUsd)
      : BigDecimals.ZERO;

    const currentPnlUsd = vlpBalanceSnapshot
      ? removeDecimals(
          calcIndexerSummaryUnrealizedPnl(vlpBalanceSnapshot),
        ).multipliedBy(primaryQuotePriceUsd)
      : BigDecimals.ZERO;

    return {
      balanceAmount,
      balanceValueUsd,
      shareOfPool,
      totalPnlUsd,
      currentPnlUsd,
    };
  }, [vlpSnapshots, indexerSnapshot, balances, primaryQuotePriceUsd]);
}
