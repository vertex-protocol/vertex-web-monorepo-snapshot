import { NotifiCardModal } from '@notifi-network/notifi-react';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

import 'client/modules/notifi/styles/index.css';

export function NotifiDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      {/* Necessary for a11y. */}
      <BaseAppDialog.Title className="sr-only">
        Notification Settings
      </BaseAppDialog.Title>
      <div className="relative">
        <IconButton
          size="sm"
          icon={Icons.X}
          onClick={hide}
          className="absolute top-3 right-3 z-20"
        />
        <NotifiCardModal darkMode />
      </div>
    </BaseAppDialog.Container>
  );
}
