import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositOptionsDropdown } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/DepositOptionsDropdown';

export function OverviewCollateralButtons({ className }: WithClassnames) {
  const { show } = useDialog();
  const isMobile = useIsMobile();
  const { trackEvent } = useAnalyticsContext();
  const isConnected = useIsConnected();

  return (
    <div className={joinClassNames('flex gap-x-2.5', className)}>
      <DepositOptionsDropdown
        hideTriggerIcons={isMobile}
        triggerClassName="flex-1"
      />
      <SecondaryButton
        className="flex-1"
        disabled={!isConnected}
        onClick={() => {
          trackEvent({
            type: 'overview_collateral_buttons_clicked',
            data: {
              buttonType: 'withdraw',
            },
          });
          show({ type: 'withdraw', params: {} });
        }}
      >
        Withdraw
      </SecondaryButton>
    </div>
  );
}
