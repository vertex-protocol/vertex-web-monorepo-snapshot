import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useSpotInterestRates } from 'client/hooks/markets/useSpotInterestRates';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useTokenAllowanceForProduct } from 'client/hooks/query/useTokenAllowanceForProduct';
import { useMinInitialDepositAmountByProductId } from 'client/hooks/subaccount/useMinInitialDepositAmountByProductId';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { DepositProductSelectValue } from 'client/modules/collateral/deposit/types';
import { sortByDisplayedAssetValue } from 'client/modules/collateral/utils/sortByDisplayedAssetValue';
import { useMemo } from 'react';

interface Params {
  productIdInput: number;
}

export function useDepositFormData({ productIdInput }: Params) {
  const { balances } = useSpotBalances();
  const { data: spotInterestRates } = useSpotInterestRates();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const { data: tokenAllowance } = useTokenAllowanceForProduct({
    productId: productIdInput,
  });
  const { data: minInitialDepositAmounts } =
    useMinInitialDepositAmountByProductId();

  // If we are either still loading, or fail to load balances, we should keep the form in an enabled state
  // to allow the user to deposit in case of a bug / RPC error
  const hasLoadedDepositableBalances = !!depositableTokenBalances;

  // All available products for depositing
  const availableProducts: DepositProductSelectValue[] = useMemo(() => {
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
          selectId: token.symbol,
          productId: balance.productId,
          icon: token.icon,
          symbol: token.symbol,
          tokenDecimals: token.tokenDecimals,
          oraclePriceUsd: balance.oraclePriceUsd,
          displayedAssetAmount: walletAmount,
          displayedAssetValueUsd:
            balance.oraclePriceUsd.multipliedBy(walletAmount),
          decimalAdjustedMinimumInitialDepositAmount:
            minInitialDepositAmounts?.[balance.productId],
          decimalAdjustedVertexBalance: vertexAmount,
          decimalAdjustedWalletBalance: walletAmount,
          depositAPR: spotInterestRates?.[balance.productId]?.deposit,
        };
      })
      .sort(sortByDisplayedAssetValue);
  }, [
    balances,
    depositableTokenBalances,
    minInitialDepositAmounts,
    spotInterestRates,
  ]);

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
