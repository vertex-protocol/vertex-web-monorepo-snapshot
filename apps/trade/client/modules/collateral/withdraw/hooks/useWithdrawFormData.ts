import { useMemo } from 'react';
import { WithdrawProduct } from 'client/modules/collateral/withdraw/types';
import { BigDecimals } from 'client/utils/BigDecimals';
import { toBigDecimal } from '@vertex-protocol/client';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { sortByDisplayedAssetValue } from 'client/modules/collateral/utils/sortByDisplayedAssetValue';

interface Params {
  productIdInput: number;
}

export function useWithdrawFormData({ productIdInput }: Params) {
  // Data
  const { balances } = useSpotBalances();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const { data: feeRates } = useSubaccountFeeRates();

  // All available products for withdrawal
  const availableProducts: WithdrawProduct[] = useMemo(() => {
    if (!balances?.length) {
      return [];
    }
    return balances
      .map((balance) => {
        const token = balance.metadata.token;
        const vertexAmount = balance.amount;
        // Silently fail here, should be ok
        const walletAmount =
          depositableTokenBalances?.[balance.productId] ?? BigDecimals.ZERO;
        const withdrawalFee = toBigDecimal(
          feeRates?.withdrawal[balance.productId] ?? 0,
        );

        const decimalAdjustedFee = removeDecimals(withdrawalFee);

        const decimalAdjustedFeeValueUsd = decimalAdjustedFee.multipliedBy(
          balance.oraclePriceUsd,
        );

        return {
          productId: balance.productId,
          icon: token.icon,
          symbol: token.symbol,
          tokenDecimals: token.tokenDecimals,
          oraclePriceUsd: balance.oraclePriceUsd,
          displayedAssetAmount: vertexAmount,
          displayedAssetValueUsd:
            balance.oraclePriceUsd.multipliedBy(vertexAmount),
          fee: {
            amount: decimalAdjustedFee,
            valueUsd: decimalAdjustedFeeValueUsd,
          },
          decimalAdjustedVertexBalance: vertexAmount,
          decimalAdjustedWalletBalance: removeDecimals(
            walletAmount,
            token.tokenDecimals,
          ),
        };
      })
      .sort(sortByDisplayedAssetValue);
  }, [balances, depositableTokenBalances, feeRates?.withdrawal]);

  // Selected product based on productId
  const selectedProduct = useMemo(() => {
    return availableProducts.find(
      (product) => product.productId === productIdInput,
    );
  }, [availableProducts, productIdInput]);

  return {
    availableProducts,
    selectedProduct,
  };
}
