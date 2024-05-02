import { BigDecimal } from '@vertex-protocol/utils';
import {
  UseDepositForm,
  useDepositForm,
} from 'client/modules/collateral/deposit/hooks/useDepositForm';
import { useCallback, useMemo } from 'react';

interface BalanceState {
  borrowed: BigDecimal;
  wallet: BigDecimal;
}

export interface UseRepayDepositForm extends UseDepositForm {
  balances: {
    current?: BalanceState;
    estimated?: BalanceState;
  };

  onMaxRepayClicked(): void;
}

export function useRepayDepositForm(): UseRepayDepositForm {
  const {
    selectedProduct: depositSelectedProduct,
    availableProducts: depositAvailableProducts,
    ...rest
  } = useDepositForm();

  // Remap products to reflect amount borrowed, and filter out non-borrows
  const availableProducts = useMemo(() => {
    return depositAvailableProducts
      .filter((product) => product.decimalAdjustedVertexBalance.isNegative())
      .map((product) => {
        return {
          ...product,
          displayedAssetAmount: product.decimalAdjustedVertexBalance.abs(),
          displayedAssetValueUsd: product.decimalAdjustedVertexBalance
            .abs()
            .multipliedBy(product.oraclePriceUsd),
        };
      });
  }, [depositAvailableProducts]);
  const selectedProduct = useMemo(() => {
    return availableProducts.find(
      (product) => product.productId === depositSelectedProduct?.productId,
    );
  }, [availableProducts, depositSelectedProduct?.productId]);

  const selectedProductCurrentBorrows = useMemo(() => {
    return selectedProduct?.decimalAdjustedVertexBalance.abs();
  }, [selectedProduct?.decimalAdjustedVertexBalance]);

  // Estimate balances
  const balances = useMemo((): UseRepayDepositForm['balances'] => {
    if (!selectedProduct || !selectedProductCurrentBorrows) {
      return {};
    }

    return {
      current: {
        borrowed: selectedProductCurrentBorrows,
        wallet: selectedProduct.decimalAdjustedWalletBalance,
      },
      estimated: rest.validAmount
        ? {
            borrowed: selectedProductCurrentBorrows.minus(rest.validAmount),
            wallet: selectedProduct.decimalAdjustedWalletBalance.minus(
              rest.validAmount,
            ),
          }
        : undefined,
    };
  }, [selectedProduct, selectedProductCurrentBorrows, rest.validAmount]);

  const onMaxRepayClicked = useCallback(() => {
    if (!selectedProduct || !selectedProductCurrentBorrows) {
      return;
    }
    rest.form.setValue(
      'amount',
      // Ensure we don't try to repay more than we have, but round the number up to ensure all borrows are paid off
      BigDecimal.min(
        selectedProductCurrentBorrows.precision(6, BigDecimal.ROUND_UP),
        selectedProduct.decimalAdjustedWalletBalance.precision(
          6,
          BigDecimal.ROUND_DOWN,
        ),
      ).toString(),
      {
        shouldValidate: true,
      },
    );
  }, [rest.form, selectedProduct, selectedProductCurrentBorrows]);

  return {
    selectedProduct,
    availableProducts,
    onMaxRepayClicked,
    balances,
    ...rest,
  };
}
