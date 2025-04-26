import { useEVMContext } from '@vertex-protocol/react-client';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';

interface Props {
  onShowSettingsClick: () => void;
}

export function ActionButtons({ onShowSettingsClick }: Props) {
  const { show, hide } = useDialog();
  const { disconnect } = useEVMContext();
  const { isNotifiEnabled } = useEnabledFeatures();

  const onShowNotifiSettingsClick = () => {
    show({ type: 'notifi_settings', params: {} });
  };

  const onDisconnectClick = () => {
    hide();
    disconnect();
  };

  return (
    <div className="flex gap-x-1.5">
      <IconButton
        tooltipLabel="Settings"
        icon={Icons.GearSix}
        size="sm"
        onClick={onShowSettingsClick}
      />
      {/*Mobile notifi entrypoint*/}
      {isNotifiEnabled && (
        <IconButton
          tooltipLabel="Notifications"
          icon={Icons.BellSimple}
          size="sm"
          onClick={onShowNotifiSettingsClick}
        />
      )}
      <IconButton
        tooltipLabel="Disconnect wallet"
        icon={Icons.Power}
        size="sm"
        onClick={onDisconnectClick}
      />
    </div>
  );
}
