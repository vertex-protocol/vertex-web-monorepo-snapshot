import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  calcIndexerLpBalanceValue,
  IndexerSnapshotBalance,
} from '@vertex-protocol/indexer-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';

export function calcIndexerSummaryUnrealizedPnl(
  indexerBalance: IndexerSnapshotBalance,
  // Alternate oracle price, defaults to the oracle price of the tracked balance
  oraclePrice: BigDecimal = indexerBalance.state.market.product.oraclePrice,
) {
  if (indexerBalance.productId === QUOTE_PRODUCT_ID) {
    return BigDecimals.ZERO;
  }

  const unrealizedPnl = calcUnrealizedPnl(
    indexerBalance.state.postBalance.amount,
    oraclePrice,
    indexerBalance.trackedVars.netEntryUnrealized,
  );

  return unrealizedPnl;
}

export function calcIndexerSummaryCumulativePnl(
  indexerBalance: IndexerSnapshotBalance,
) {
  if (indexerBalance.productId === QUOTE_PRODUCT_ID) {
    return BigDecimals.ZERO;
  }
  const cumulativePnl = calcUnrealizedPnl(
    indexerBalance.state.postBalance.amount,
    indexerBalance.state.market.product.oraclePrice,
    indexerBalance.trackedVars.netEntryCumulative,
  );

  return cumulativePnl;
}

export function calcIndexerSummaryUnrealizedLpPnl(
  indexerBalance: IndexerSnapshotBalance,
) {
  if (indexerBalance.productId === QUOTE_PRODUCT_ID) {
    return BigDecimals.ZERO;
  }
  const lpBalanceValue = calcIndexerLpBalanceValue(
    indexerBalance.state.postBalance,
    indexerBalance.state.market,
  );
  return lpBalanceValue.minus(indexerBalance.trackedVars.netEntryLpUnrealized);
}

export function calcIndexerSummaryCumulativeLpPnl(
  indexerBalance: IndexerSnapshotBalance,
) {
  if (indexerBalance.productId === QUOTE_PRODUCT_ID) {
    return BigDecimals.ZERO;
  }
  const lpBalanceValue = calcIndexerLpBalanceValue(
    indexerBalance.state.postBalance,
    indexerBalance.state.market,
  );
  return lpBalanceValue.minus(indexerBalance.trackedVars.netEntryLpCumulative);
}

/**
 * Calculates fractional PnL, returning zero if denominator is zero
 *
 * @param denominator Either the entry cost for a perp position or the total subaccount value for subaccount-wide
 * @param pnl pnl for the position / subaccount
 */
export function calcPnlFrac(pnl: BigDecimal, denominator: BigDecimal) {
  return denominator.isZero()
    ? BigDecimals.ZERO
    : // Abs the denom to retain the same sign as pnl
      pnl.div(denominator.abs());
}

// Same as above, but returns undefined if denominator is near-zero
export function calcPnlFracForNonZeroDenom(
  pnl: BigDecimal,
  denominator: BigDecimal,
  fallbackDenom?: BigDecimal,
) {
  const threshold = 0.01;
  if (denominator.abs().gt(threshold)) {
    return pnl.div(denominator.abs());
  }
  if (fallbackDenom && fallbackDenom.abs().gt(threshold)) {
    return pnl.div(fallbackDenom.abs());
  }
  return undefined;
}

export function calcUnrealizedPnl(
  positionAmount: BigDecimal,
  oraclePrice: BigDecimal,
  netEntryUnrealized: BigDecimal,
) {
  return positionAmount.multipliedBy(oraclePrice).minus(netEntryUnrealized);
}
