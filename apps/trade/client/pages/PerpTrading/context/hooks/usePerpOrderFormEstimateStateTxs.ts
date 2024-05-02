import { BalanceSide } from '@vertex-protocol/contracts';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';

interface Params {
  orderSide: BalanceSide;
  productId: number | undefined;
  enableMaxSizeLogic: boolean;
  validatedAssetAmountInput: BigDecimal | undefined;
  executionConversionPrice: BigDecimal | undefined;
  maxAssetOrderSize: BigDecimal | undefined;
}

export function usePerpOrderFormEstimateStateTxs({
  orderSide,
  productId,
  enableMaxSizeLogic,
  validatedAssetAmountInput,
  executionConversionPrice,
  maxAssetOrderSize,
}: Params) {
  return useMemo((): SubaccountTx[] => {
    const invalidOrderSize =
      enableMaxSizeLogic &&
      maxAssetOrderSize &&
      validatedAssetAmountInput?.isGreaterThan(maxAssetOrderSize);

    if (
      !productId ||
      !validatedAssetAmountInput ||
      !executionConversionPrice ||
      invalidOrderSize
    ) {
      return [];
    }

    const assetAmountDelta = addDecimals(
      orderSide === 'long'
        ? validatedAssetAmountInput
        : validatedAssetAmountInput.negated(),
    );
    const quoteAmountDelta = assetAmountDelta
      .multipliedBy(executionConversionPrice)
      .negated();

    return [
      {
        type: 'apply_delta',
        tx: {
          productId: productId,
          amountDelta: assetAmountDelta,
          vQuoteDelta: quoteAmountDelta,
        },
      },
    ];
  }, [
    enableMaxSizeLogic,
    maxAssetOrderSize,
    validatedAssetAmountInput,
    productId,
    executionConversionPrice,
    orderSide,
  ]);
}
