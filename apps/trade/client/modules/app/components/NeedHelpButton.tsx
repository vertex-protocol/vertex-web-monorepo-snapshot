'use client';

import { Button } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function NeedHelpButton() {
  const { show } = useDialog();

  return (
    <Button
      className="text-text-secondary hover:text-text-primary"
      onClick={() => show({ type: 'help_center', params: {} })}
    >
      Need Help?
    </Button>
  );
}
