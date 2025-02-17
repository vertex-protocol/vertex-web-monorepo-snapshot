import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useExecuteApproveAllowanceForProduct } from 'client/hooks/execute/useExecuteApproveAllowanceForProduct';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import { useTokenAllowanceForProduct } from 'client/hooks/query/useTokenAllowanceForProduct';
import { useCallback, useMemo } from 'react';

export const SLOW_MODE_FEE_AMOUNT_USDC = 1;

/**
 * Util hook for querying/mutating token allowance for slow mode transactions
 * Slow mode transactions require 1 USDC in fee
 */
export function useSlowModeFeeAllowance() {
  const { data: tokenAllowanceWithDecimals } = useTokenAllowanceForProduct({
    productId: QUOTE_PRODUCT_ID,
  });
  const { data: marketsStaticData } = useAllMarketsStaticData();

  const executeApproveAllowance = useExecuteApproveAllowanceForProduct();

  const quoteAllowance = useMemo(() => {
    if (!marketsStaticData || !tokenAllowanceWithDecimals) {
      return;
    }
    return removeDecimals(
      tokenAllowanceWithDecimals,
      marketsStaticData.primaryQuote.metadata.token.tokenDecimals,
    );
  }, [marketsStaticData, tokenAllowanceWithDecimals]);

  const requiresApproval = quoteAllowance?.lt(SLOW_MODE_FEE_AMOUNT_USDC);

  const approveFeeAllowance = useCallback(async () => {
    if (!marketsStaticData) {
      throw Error('Quote decimals not yet loaded');
    }
    return executeApproveAllowance.mutateAsync({
      productId: QUOTE_PRODUCT_ID,
      amount: addDecimals(
        SLOW_MODE_FEE_AMOUNT_USDC,
        marketsStaticData.primaryQuote.metadata.token.tokenDecimals,
      ).toFixed(),
    });
  }, [executeApproveAllowance, marketsStaticData]);

  const approvalTxState = useOnChainTransactionState({
    txHash: executeApproveAllowance.data,
  });

  return {
    requiresApproval,
    approveFeeAllowance,
    executeApproveAllowance,
    approvalTxState,
  };
}
