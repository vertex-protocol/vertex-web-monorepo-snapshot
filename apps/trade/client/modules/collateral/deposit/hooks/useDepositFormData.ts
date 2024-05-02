import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useDepositTokenAllowance } from 'client/hooks/query/useDepositTokenAllowance';
import { useMinimumDepositAmounts } from 'client/hooks/subaccount/useMinimumDepositAmounts';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { DepositProduct } from 'client/modules/collateral/deposit/types';
import { sortByDisplayedAssetValue } from 'client/modules/collateral/utils/sortByDisplayedAssetValue';
import { BigDecimals } from 'client/utils/BigDecimals';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';

interface Params {
  productIdInput: number;
}

export function useDepositFormData({ productIdInput }: Params) {
  const { balances } = useSpotBalances();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const { data: tokenAllowance } = useDepositTokenAllowance({
    productId: productIdInput,
  });
  const { data: minDepositAmounts } = useMinimumDepositAmounts();

  // If we are either still loading, or fail to load balances, we should keep the form in an enabled state
  // to allow the user to deposit in case of a bug / RPC error
  const hasLoadedDepositableBalances = !!depositableTokenBalances;

  // All available products for depositing
  const availableProducts: DepositProduct[] = useMemo(() => {
    if (!balances?.length) {
      return [];
    }

    return balances
      .map((balance) => {
        const token = balance.metadata.token;
        const vertexAmount = balance.amount;
        // Silently fail here, should be ok
        const walletAmount = removeDecimals(
          depositableTokenBalances?.[balance.productId] ?? BigDecimals.ZERO,
          token.tokenDecimals,
        );

        return {
          productId: balance.productId,
          icon: token.icon,
          symbol: token.symbol,
          tokenDecimals: token.tokenDecimals,
          oraclePriceUsd: balance.oraclePriceUsd,
          displayedAssetAmount: walletAmount,
          displayedAssetValueUsd:
            balance.oraclePriceUsd.multipliedBy(walletAmount),
          decimalAdjustedMinimumInitialDepositAmount: removeDecimals(
            minDepositAmounts?.[balance.productId],
          ),
          decimalAdjustedVertexBalance: vertexAmount,
          decimalAdjustedWalletBalance: walletAmount,
        };
      })
      .sort(sortByDisplayedAssetValue);
  }, [balances, depositableTokenBalances, minDepositAmounts]);

  // Currently selected product based on productId
  const selectedProduct = useMemo(() => {
    return availableProducts.find(
      (product) => product.productId === productIdInput,
    );
  }, [availableProducts, productIdInput]);

  return {
    availableProducts,
    hasLoadedDepositableBalances,
    selectedProduct,
    tokenAllowance,
  };
}
