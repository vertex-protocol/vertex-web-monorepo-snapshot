import { SecondaryButton } from '@vertex-protocol/web-ui';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useMemo } from 'react';

export function CloseAllPositionsButton() {
  const { show } = useDialog();
  const { data: perpBalances } = usePerpPositions();

  const hasPositions = useMemo(() => {
    return !!perpBalances?.some((balance) => !balance.amount.isZero());
  }, [perpBalances]);

  const isConnected = useIsConnected();

  return (
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
  );
}
