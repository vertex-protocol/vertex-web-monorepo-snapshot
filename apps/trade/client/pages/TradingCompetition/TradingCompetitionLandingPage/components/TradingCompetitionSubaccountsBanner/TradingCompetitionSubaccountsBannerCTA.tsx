'use client';

import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function TradingCompetitionSubaccountsBannerCTA() {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  return (
    <TextButton
      colorVariant="secondary"
      className="text-xs sm:text-sm"
      endIcon={<Icons.CaretRight />}
      onClick={() => show({ type: 'manage_subaccounts', params: {} })}
      disabled={!isConnected}
    >
      Create & Manage Accounts
    </TextButton>
  );
}
