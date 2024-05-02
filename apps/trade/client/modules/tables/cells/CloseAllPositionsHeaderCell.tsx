import { Header } from '@tanstack/react-table';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useMemo } from 'react';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

export function CloseAllPositionsHeaderCell<T>({
  header,
}: {
  header: Header<T, any>;
}) {
  const { trackEvent } = useAnalyticsContext();
  const { show } = useDialog();
  const userActionState = useUserActionState();
  const { data: perpBalances } = usePerpPositions();

  const perpPositions = useMemo(() => {
    return perpBalances?.filter((balance) => !balance.amount.isZero());
  }, [perpBalances]);

  const hasPositions = perpPositions && perpPositions.length > 0;

  return (
    <HeaderCell header={header} className="flex justify-end px-4">
      <SecondaryButton
        destructive
        size="sm"
        disabled={!hasPositions || userActionState === 'block_all'}
        onClick={() => {
          show({
            type: 'close_all_positions',
            params: {},
          });

          if (perpPositions) {
            trackEvent({
              type: 'close_all_positions_placed',
              data: { numOpenPositions: perpPositions.length },
            });
          }
        }}
      >
        Close all positions
      </SecondaryButton>
    </HeaderCell>
  );
}
