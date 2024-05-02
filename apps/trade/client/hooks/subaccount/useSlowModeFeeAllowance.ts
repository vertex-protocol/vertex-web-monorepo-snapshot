import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { useExecuteApproveAllowance } from 'client/hooks/execute/useExecuteApproveAllowance';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useDepositTokenAllowance } from 'client/hooks/query/useDepositTokenAllowance';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import { BigDecimals } from 'client/utils/BigDecimals';
import { addDecimals, removeDecimals } from 'client/utils/decimalAdjustment';
import { useCallback, useMemo } from 'react';

const FEE_AMOUNT_USDC = BigDecimals.ONE;

/**
 * Util hook for querying/mutating token allowance for slow mode transactions
 * Slow mode transactions require 1 USDC in fee
 */
export function useSlowModeFeeAllowance() {
  const { data: tokenAllowanceWithDecimals } = useDepositTokenAllowance({
    productId: QUOTE_PRODUCT_ID,
  });
  const { data: marketsStaticData } = useAllMarketsStaticData();

  const executeApproveAllowance = useExecuteApproveAllowance();

  const quoteAllowance = useMemo(() => {
    if (!marketsStaticData || !tokenAllowanceWithDecimals) {
      return;
    }
    return removeDecimals(
      tokenAllowanceWithDecimals,
      marketsStaticData.quote.metadata.token.tokenDecimals,
    );
  }, [marketsStaticData, tokenAllowanceWithDecimals]);

  const requiresApproval = quoteAllowance?.lt(FEE_AMOUNT_USDC);

  const approveFeeAllowance = useCallback(async () => {
    if (!marketsStaticData) {
      throw Error('Quote decimals not yet loaded');
    }
    return executeApproveAllowance.mutateAsync({
      productId: QUOTE_PRODUCT_ID,
      amount: addDecimals(
        FEE_AMOUNT_USDC,
        marketsStaticData.quote.metadata.token.tokenDecimals,
      ).toFixed(),
    });
  }, [executeApproveAllowance, marketsStaticData]);

  const approvalTxState = useOnChainTransactionState({
    txResponse: executeApproveAllowance.data,
  });

  return {
    requiresApproval,
    approveFeeAllowance,
    executeApproveAllowance,
    approvalTxState,
  };
}
