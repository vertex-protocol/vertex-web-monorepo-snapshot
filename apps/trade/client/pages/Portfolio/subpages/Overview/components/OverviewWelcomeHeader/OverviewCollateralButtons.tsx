import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { CardButton } from '@vertex-protocol/web-ui';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositEntrypointButton } from 'client/modules/collateral/deposit/components/DepositEntrypointButton/DepositEntrypointButton';

export function OverviewCollateralButtons({ className }: WithClassnames) {
  const { show } = useDialog();

  const isMobile = useIsMobile();
  const isConnected = useIsConnected();

  return (
    <div className={joinClassNames('flex gap-x-2.5', className)}>
      <DepositEntrypointButton
        hideTriggerIcons={isMobile}
        triggerClassName="flex-1"
      />
      <CardButton
        className="flex-1"
        disabled={!isConnected}
        onClick={() => {
          show({ type: 'withdraw', params: {} });
        }}
      >
        Withdraw
      </CardButton>
    </div>
  );
}
