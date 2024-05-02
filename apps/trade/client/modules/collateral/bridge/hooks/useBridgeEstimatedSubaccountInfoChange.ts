import { useMemo } from 'react';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { DestinationBridgeToken } from 'client/modules/collateral/bridge/types';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';

interface Params {
  selectedDestinationToken: DestinationBridgeToken | undefined;
  // Has token decimals removed (ex. 1.5, not 1.5e6)
  estimatedReceiveAmount: BigDecimal | undefined;
}

export function useBridgeEstimatedSubaccountInfoChange({
  selectedDestinationToken,
  estimatedReceiveAmount,
}: Params) {
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    if (!selectedDestinationToken || !estimatedReceiveAmount) {
      return [];
    }

    return [
      {
        type: 'apply_delta',
        tx: {
          productId: selectedDestinationToken.vertexProduct.productId,
          amountDelta: addDecimals(estimatedReceiveAmount),
          vQuoteDelta: toBigDecimal(0),
        },
      },
    ];
  }, [estimatedReceiveAmount, selectedDestinationToken]);

  return useCollateralEstimateSubaccountInfoChange({
    productId: selectedDestinationToken?.vertexProduct.productId,
    estimateStateTxs,
  });
}
