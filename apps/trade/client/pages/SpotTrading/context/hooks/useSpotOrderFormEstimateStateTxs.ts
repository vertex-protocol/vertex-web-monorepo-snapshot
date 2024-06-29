import { BalanceSide } from '@vertex-protocol/contracts';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { addDecimals, BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';

interface Params {
  orderSide: BalanceSide;
  productId: number | undefined;
  quoteProductId: number | undefined;
  enableMaxSizeLogic: boolean;
  validatedAssetAmountInput: BigDecimal | undefined;
  executionConversionPrice: BigDecimal | undefined;
  maxAssetOrderSize: BigDecimal | undefined;
}

export function useSpotOrderFormEstimateStateTxs({
  orderSide,
  productId,
  quoteProductId,
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
      // We can't do !quoteProductId because it can be 0
      quoteProductId == null ||
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
          productId: quoteProductId,
          amountDelta: quoteAmountDelta,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
      {
        type: 'apply_delta',
        tx: {
          productId: productId,
          amountDelta: assetAmountDelta,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [
    enableMaxSizeLogic,
    maxAssetOrderSize,
    validatedAssetAmountInput,
    productId,
    quoteProductId,
    executionConversionPrice,
    orderSide,
  ]);
}
