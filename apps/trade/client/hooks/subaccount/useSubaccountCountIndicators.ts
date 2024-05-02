import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { sum, sumBy } from 'lodash';
import { useMemo } from 'react';
import { useLpBalances } from 'client/hooks/subaccount/useLpBalances';
import { useSubaccountOpenTriggerOrders } from '../query/subaccount/useSubaccountOpenTriggerOrders';
import { useSubaccountOpenEngineOrders } from '../query/subaccount/useSubaccountOpenEngineOrders';

interface UseSubaccountCountIndicators {
  numPerpPositions: number;
  numOpenEngineOrders: number;
  numOpenTriggerOrders: number;
  numOpenOrders: number;
  numLpPositions: number;
}

export type SubaccountCountIndicatorKey = keyof UseSubaccountCountIndicators;

export function useSubaccountCountIndicators(): UseSubaccountCountIndicators {
  const { data: perpPositions } = usePerpPositions();
  const { balances: lpBalances } = useLpBalances();

  const numPerpPositions = useMemo(() => {
    return (
      perpPositions?.filter((position) => !position.amount.isZero()).length ?? 0
    );
  }, [perpPositions]);
  const numLpPositions = useMemo(() => {
    return (
      lpBalances?.filter((balance) => !balance.lpAmount.isZero()).length ?? 0
    );
  }, [lpBalances]);

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
    numPerpPositions,
    numOpenEngineOrders,
    numOpenTriggerOrders,
    numOpenOrders,
    numLpPositions,
  };
}
