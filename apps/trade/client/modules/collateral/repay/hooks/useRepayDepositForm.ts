import { BigDecimal } from '@vertex-protocol/utils';
import {
  UseDepositForm,
  useDepositForm,
} from 'client/modules/collateral/deposit/hooks/useDepositForm';
import { roundToString } from 'client/utils/rounding';
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

  onAmountBorrowingClicked(): void;

  onMaxDepositClicked(): void;
}

export function useRepayDepositForm({
  initialProductId,
}: {
  initialProductId: number | undefined;
}): UseRepayDepositForm {
  const {
    selectedProduct: depositSelectedProduct,
    availableProducts: depositAvailableProducts,
    validAmount,
    form,
    ...rest
  } = useDepositForm({ initialProductId });
  const { setValue } = form;

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
      estimated: validAmount
        ? {
            borrowed: selectedProductCurrentBorrows.minus(validAmount),
            wallet:
              selectedProduct.decimalAdjustedWalletBalance.minus(validAmount),
          }
        : undefined,
    };
  }, [selectedProduct, selectedProductCurrentBorrows, validAmount]);

  const onMaxRepayClicked = useCallback(() => {
    if (!selectedProduct || !selectedProductCurrentBorrows) {
      return;
    }
    setValue(
      'amount',
      // Ensure we don't try to repay more than we have, but round the number up to ensure all borrows are paid off
      BigDecimal.min(
        selectedProductCurrentBorrows.precision(8, BigDecimal.ROUND_UP),
        selectedProduct.decimalAdjustedWalletBalance.precision(
          8,
          BigDecimal.ROUND_DOWN,
        ),
      ).toString(),
      {
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  }, [selectedProduct, selectedProductCurrentBorrows, setValue]);

  const onAmountBorrowingClicked = useCallback(() => {
    if (!selectedProductCurrentBorrows) {
      return;
    }
    setValue(
      'amount',
      roundToString(selectedProductCurrentBorrows, 8, BigDecimal.ROUND_UP),
      {
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  }, [selectedProductCurrentBorrows, setValue]);

  const onMaxDepositClicked = useCallback(() => {
    if (!selectedProduct) {
      return;
    }
    setValue(
      'amount',
      roundToString(
        selectedProduct.decimalAdjustedWalletBalance,
        8,
        BigDecimal.ROUND_DOWN,
      ),
      {
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  }, [selectedProduct, setValue]);

  return {
    selectedProduct,
    availableProducts,
    onMaxRepayClicked,
    onAmountBorrowingClicked,
    onMaxDepositClicked,
    balances,
    validAmount,
    form,
    ...rest,
  };
}
