import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ShowHideIcon } from 'client/components/Icons/ShowHideIcon';
import { Icons, LabelTooltip, SecondaryButton } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { ChainSpecificContent } from 'client/modules/chainSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

interface Props {
  isAddressPrivate: boolean;
  setIsAddressPrivate: (isAddressPrivate: boolean) => void;
  onShowSettingsClick: () => void;
}

export function ControlCenterIconButtons({
  isAddressPrivate,
  setIsAddressPrivate,
  onShowSettingsClick,
}: Props) {
  const { trackEvent } = useAnalyticsContext();
  const { show, hide } = useDialog();
  const { disconnect } = useSubaccountContext();
  const hideIconMessage = isAddressPrivate
    ? 'Show wallet address'
    : 'Hide wallet address';

  const onShowNotifiSettingsClick = () => {
    show({ type: 'notifi_settings', params: {} });
    trackEvent({ type: 'notifi_clicked', data: {} });
  };

  const onDisconnectClick = () => {
    hide();
    disconnect();
  };

  return (
    <div className="flex gap-x-2">
      <TooltipButton
        tooltipLabel={hideIconMessage}
        icon={<ShowHideIcon size={14} isHidden={isAddressPrivate} />}
        onClick={() => setIsAddressPrivate(!isAddressPrivate)}
      />
      {/*Mobile notifi entrypoint*/}
      <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
        <TooltipButton
          tooltipLabel="Notifications"
          icon={<Icons.CgBell size={20} />}
          onClick={onShowNotifiSettingsClick}
        />
      </ChainSpecificContent>
      <TooltipButton
        tooltipLabel="Settings"
        icon={<Icons.AiOutlineSetting size={20} />}
        onClick={onShowSettingsClick}
      />
      <TooltipButton
        tooltipLabel="Disconnect wallet"
        icon={<Icons.MdOutlinePowerOff size={20} />}
        onClick={onDisconnectClick}
      />
    </div>
  );
}

function TooltipButton({
  tooltipLabel,
  icon,
  onClick,
  className,
}: WithClassnames<{
  tooltipLabel: string;
  icon: ReactNode;
  onClick: () => void;
}>) {
  return (
    <LabelTooltip label={tooltipLabel} className={className}>
      <SecondaryButton
        className="h-8 w-8 p-1.5"
        size="sm"
        endIcon={icon}
        onClick={onClick}
      />
    </LabelTooltip>
  );
}
