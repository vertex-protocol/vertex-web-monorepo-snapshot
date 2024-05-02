import { useHistoricalCollateralEventsTable } from './useHistoricalCollateralEventsTable';

export function useActiveWithdrawalIndicator() {
  const { mappedData } = useHistoricalCollateralEventsTable({
    eventTypes: ['withdraw_collateral'],
  });
  return mappedData?.filter((item) => item.isPending).length;
}
