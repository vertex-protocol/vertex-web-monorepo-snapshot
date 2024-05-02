import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositFormContent } from 'client/modules/collateral/deposit/components/DepositFormContent';
import { useState } from 'react';
import { DepositHelpContent } from './DepositHelpContent';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

export function DepositDialog() {
  const { hide } = useDialog();
  const [showHelpContent, setShowHelpContent] = useState(false);
  const { trackEvent } = useAnalyticsContext();

  const content = showHelpContent ? (
    <DepositHelpContent
      onBackClick={() => setShowHelpContent(false)}
      onClose={hide}
    />
  ) : (
    <DepositFormContent
      onShowHelpClick={() => {
        setShowHelpContent(true);
        trackEvent({
          type: 'collateral_faq_clicked',
          data: { collateralFaq: 'deposit' },
        });
      }}
      onClose={hide}
    />
  );
  return <BaseAppDialog onClose={hide}>{content}</BaseAppDialog>;
}
