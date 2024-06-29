import { WithClassnames } from '@vertex-protocol/web-common';
import {
  IconButton,
  Icons,
  IconType,
  LabelTooltip,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';

interface Props {
  onShowSettingsClick: () => void;
}

export function ActionButtons({ onShowSettingsClick }: Props) {
  const { show, hide } = useDialog();
  const { disconnect } = useSubaccountContext();

  const onShowNotifiSettingsClick = () => {
    show({ type: 'notifi_settings', params: {} });
  };

  const onDisconnectClick = () => {
    hide();
    disconnect();
  };

  return (
    <div className="flex gap-x-1.5">
      {/*For settings, show text on larger screens, and icon on smaller ones*/}
      <SecondaryButton
        size="xs"
        onClick={onShowSettingsClick}
        className="hidden sm:flex"
      >
        Settings
      </SecondaryButton>
      <TooltipButton
        className="sm:hidden"
        tooltipLabel="Settings"
        icon={Icons.BsGear}
        onClick={onShowSettingsClick}
      />
      <TooltipButton
        tooltipLabel="Disconnect wallet"
        icon={Icons.MdOutlinePowerOff}
        onClick={onDisconnectClick}
      />
      {/*Mobile notifi entrypoint*/}
      <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
        <TooltipButton
          tooltipLabel="Notifications"
          icon={Icons.CgBell}
          onClick={onShowNotifiSettingsClick}
        />
      </ChainSpecificContent>
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
  icon: IconType;
  onClick: () => void;
}>) {
  return (
    <LabelTooltip
      label={tooltipLabel}
      className={className}
      asChild
      noHelpCursor
    >
      <IconButton size="sm" icon={icon} onClick={onClick} />
    </LabelTooltip>
  );
}
