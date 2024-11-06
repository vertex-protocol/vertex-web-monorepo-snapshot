import { Header } from '@tanstack/react-table';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useMemo } from 'react';

export function CloseAllPositionsHeaderCell<T>({
  header,
}: {
  header: Header<T, any>;
}) {
  const { show } = useDialog();
  const { data: perpBalances } = usePerpPositions();

  const perpPositions = useMemo(() => {
    return perpBalances?.filter((balance) => !balance.amount.isZero());
  }, [perpBalances]);

  const hasPositions = perpPositions && perpPositions.length > 0;
  const isConnected = useIsConnected();

  return (
    <HeaderCell header={header} className="flex justify-end px-4">
      <SecondaryButton
        destructive
        size="xs"
        disabled={!hasPositions || !isConnected}
        onClick={() => {
          show({
            type: 'close_all_positions',
            params: {},
          });
        }}
      >
        Close all positions
      </SecondaryButton>
    </HeaderCell>
  );
}
