import { useSubaccountOpenEngineOrders } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { sum, sumBy } from 'lodash';
import { useMemo } from 'react';

interface UseSubaccountCountIndicators {
  numPerpPositions: number;
  numCrossPerpPositions: number;
  numIsoPerpPositions: number;
  numOpenEngineOrders: number;
  numOpenTriggerOrders: number;
  numOpenOrders: number;
}

export type SubaccountCountIndicatorKey = keyof UseSubaccountCountIndicators;

export function useSubaccountCountIndicators(): UseSubaccountCountIndicators {
  const { data: perpPositions } = usePerpPositions();

  const { numCrossPerpPositions, numIsoPerpPositions, numPerpPositions } =
    useMemo(() => {
      let numCross = 0;
      let numIso = 0;

      perpPositions?.forEach((position) => {
        if (position.amount.isZero()) {
          return;
        }

        if (position.iso) {
          numIso++;
        } else {
          numCross++;
        }
      });

      return {
        numCrossPerpPositions: numCross,
        numIsoPerpPositions: numIso,
        numPerpPositions: numCross + numIso,
      };
    }, [perpPositions]);

  const { data: openEngineOrders } = useSubaccountOpenEngineOrders();
  const { data: openTriggerOrders } = useSubaccountOpenTriggerOrders();

  const numOpenEngineOrders = useMemo(() => {
    return sumBy(
      Object.values(openEngineOrders ?? {}),
      (ordersForProduct) => ordersForProduct.length,
    );
  }, [openEngineOrders]);

  const numOpenTriggerOrders = useMemo(() => {
    return sumBy(
      Object.values(openTriggerOrders ?? {}),
      (ordersForProduct) => ordersForProduct.length,
    );
  }, [openTriggerOrders]);

  const numOpenOrders = sum([numOpenEngineOrders, numOpenTriggerOrders]);

  return {
    numCrossPerpPositions,
    numIsoPerpPositions,
    numPerpPositions,
    numOpenEngineOrders,
    numOpenTriggerOrders,
    numOpenOrders,
  };
}
