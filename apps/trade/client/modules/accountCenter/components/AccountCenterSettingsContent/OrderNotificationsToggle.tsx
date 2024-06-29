import { useEnableTradingNotifications } from 'client/modules/trading/hooks/useEnableTradingNotifications';
import { Switch } from '@vertex-protocol/web-ui';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';

export function OrderNotificationsToggle() {
  const { enableTradingNotifications, setEnableTradingNotifications } =
    useEnableTradingNotifications();

  return (
    <Switch.Row>
      <SwitchLabelWithTooltip
        id="trading-notifs"
        definitionId="settingsOrderNotifications"
      >
        Order Notifications
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="trading-notifs"
        checked={enableTradingNotifications}
        onCheckedChange={setEnableTradingNotifications}
      />
    </Switch.Row>
  );
}
