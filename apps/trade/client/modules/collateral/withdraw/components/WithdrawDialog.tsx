import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useState } from 'react';
import { WithdrawHelpContent } from 'client/modules/collateral/withdraw/components/WithdrawHelpContent';
import { WithdrawFormContent } from 'client/modules/collateral/withdraw/components/WithdrawFormContent';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

interface Props {
  defaultEnableBorrows: boolean;
}

export function WithdrawDialog({ defaultEnableBorrows }: Props) {
  const { hide } = useDialog();
  const [showHelpContent, setShowHelpContent] = useState(false);
  const { trackEvent } = useAnalyticsContext();

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
        trackEvent({
          type: 'collateral_faq_clicked',
          data: { collateralFaq: 'withdraw' },
        });
      }}
      onClose={hide}
    />
  );
  return <BaseAppDialog onClose={hide}>{content}</BaseAppDialog>;
}
