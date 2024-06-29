import { Divider, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useEffect } from 'react';

function WithdrawHelpInfoCard() {
  return (
    <div className="bg-surface-1 text-text-secondary flex w-full flex-col gap-y-2.5 rounded p-3 text-sm">
      <p>
        There is <span className="text-text-primary">no</span> bridging involved
      </p>
      <Divider className="bg-accent w-10" />
      <p>Withdrawals are submitted once gas prices are within range</p>
      <Divider className="bg-accent w-10" />
      <p>
        All successfully placed withdrawals will be processed and you can
        monitor the status in Withdrawals History
      </p>
      <Divider className="bg-accent w-10" />
      <p>
        Enable the <span className="text-text-primary">borrowing toggle</span>{' '}
        to borrow assets against your margin
      </p>
    </div>
  );
}

export function WithdrawHelpContent({
  onClose,
  onBackClick,
}: {
  onClose(): void;
  onBackClick(): void;
}) {
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    trackEvent({
      type: 'withdraw_dialog_view',
      data: {
        contentType: 'help',
      },
    });
  }, [trackEvent]);

  return (
    <>
      <BaseDialog.Title onClose={onClose}>
        <div className="flex items-center gap-x-3">
          <SecondaryButton
            size="sm"
            startIcon={<Icons.FiChevronLeft size={14} />}
            onClick={onBackClick}
            className="gap-x-1 py-0 pl-1 pr-2"
          >
            Back
          </SecondaryButton>
          <span>Withdraw FAQ</span>
        </div>
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-2">
        <WithdrawHelpInfoCard />
      </BaseDialog.Body>
    </>
  );
}
