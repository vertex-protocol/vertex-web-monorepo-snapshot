import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { WithdrawFormContent } from 'client/modules/collateral/withdraw/components/WithdrawFormContent';
import { WithdrawHelpContent } from 'client/modules/collateral/withdraw/components/WithdrawHelpContent';
import { useState } from 'react';

interface Props {
  defaultEnableBorrows: boolean;
}

export function WithdrawDialog({ defaultEnableBorrows }: Props) {
  const { hide } = useDialog();
  const [showHelpContent, setShowHelpContent] = useState(false);

  const content = showHelpContent ? (
    <WithdrawHelpContent
      onBackClick={() => setShowHelpContent(false)}
      onClose={hide}
    />
  ) : (
    <WithdrawFormContent
      defaultEnableBorrows={defaultEnableBorrows}
      onShowHelpClick={() => {
        setShowHelpContent(true);
      }}
      onClose={hide}
    />
  );
  return <BaseAppDialog onClose={hide}>{content}</BaseAppDialog>;
}
