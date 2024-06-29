import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositFormContent } from 'client/modules/collateral/deposit/components/DepositFormContent';
import { useState } from 'react';
import { DepositHelpContent } from './DepositHelpContent';

export function DepositDialog() {
  const { hide } = useDialog();
  const [showHelpContent, setShowHelpContent] = useState(false);

  const content = showHelpContent ? (
    <DepositHelpContent
      onBackClick={() => setShowHelpContent(false)}
      onClose={hide}
    />
  ) : (
    <DepositFormContent
      onShowHelpClick={() => {
        setShowHelpContent(true);
      }}
      onClose={hide}
    />
  );
  return <BaseAppDialog onClose={hide}>{content}</BaseAppDialog>;
}
