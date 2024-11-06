import {
  NotifiCardModal,
  NotifiCardModalProps,
} from '@notifi-network/notifi-react';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

import 'client/modules/notifi/styles/index.css';

const customCopy: NotifiCardModalProps['copy'] = {
  Ftu: {
    FtuTargetEdit: {
      TargetInputs: {
        inputSeparators: {
          email: 'OR',
          telegram: 'OR',
          discord: 'OR',
        },
      },
    },
  },
  Inbox: {
    InboxConfigTargetEdit: {
      TargetInputs: {
        inputSeparators: {
          email: 'OR',
          telegram: 'OR',
          discord: 'OR',
        },
      },
    },
  },
};

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
          className="absolute right-3 top-3 z-20"
        />
        <NotifiCardModal darkMode copy={customCopy} />
      </div>
    </BaseAppDialog.Container>
  );
}
