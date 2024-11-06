import {
  BigDecimal,
  removeDecimals,
  sumBigDecimalBy,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { EstimatedBridgeRoute } from 'client/modules/collateral/bridge/hooks/query/useEstimatedBridgeRoute';
import {
  BridgeChain,
  DestinationBridgeToken,
} from 'client/modules/collateral/bridge/types';
import { first } from 'lodash';
import { useMemo } from 'react';

interface Params {
  selectedSourceChain: BridgeChain | undefined;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  estimatedBridgeRoute: EstimatedBridgeRoute | undefined;
}

export interface BridgeRouteSummary {
  receiveAmount: BigDecimal;
  estimatedReceiveValueUsd: BigDecimal | undefined;
  bridgeTime: number;
  gas:
    | {
        amount: BigDecimal;
        symbol: string;
        valueUsd: BigDecimal;
      }
    | undefined;
  feeUsd: BigDecimal;
}

export function useBridgeRouteSummary({
  estimatedBridgeRoute,
  selectedDestinationToken,
  selectedSourceChain,
}: Params) {
  return useMemo((): BridgeRouteSummary | undefined => {
    if (!estimatedBridgeRoute || !selectedSourceChain) {
      return;
    }

    const {
      route: { estimate },
    } = estimatedBridgeRoute;

    const receiveAmount = removeDecimals(
      toBigDecimal(estimate.toAmount),
      estimate.toToken.decimals,
    );

    const feeUsd = sumBigDecimalBy(estimate.feeCosts, (fee) =>
      toBigDecimal(fee.amountUsd),
    );

    // We only expect 1 gas cost
    const gasCost = first(estimate.gasCosts);

    const estimatedReceiveValueUsd = selectedDestinationToken?.oraclePriceUsd
      ? receiveAmount.times(selectedDestinationToken.oraclePriceUsd)
      : undefined;

    return {
      bridgeTime: estimate.estimatedRouteDuration,
      feeUsd,
      gas: gasCost
        ? {
            amount: removeDecimals(
              toBigDecimal(gasCost.amount),
              gasCost.token.decimals,
            ),
            symbol: gasCost.token.symbol,
            valueUsd: toBigDecimal(gasCost.amountUsd),
          }
        : undefined,
      receiveAmount,
      estimatedReceiveValueUsd,
    };
  }, [estimatedBridgeRoute, selectedDestinationToken, selectedSourceChain]);
}
