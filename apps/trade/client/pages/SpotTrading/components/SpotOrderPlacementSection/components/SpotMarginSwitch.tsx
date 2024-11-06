import { WithClassnames } from '@vertex-protocol/web-common';
import { Switch } from '@vertex-protocol/web-ui';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';

export function SpotMarginSwitch({ className }: WithClassnames) {
  const { spotLeverageEnabled, setSpotLeverageEnabled } =
    useSpotLeverageEnabled();

  return (
    <Switch.Row className={className}>
      <SwitchLabelWithTooltip
        id="spot-leverage"
        definitionId="spotLeverageSwitch"
        decoration={{ icon: { size: 14, className: 'text-text-primary' } }}
      >
        Margin Spot
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="spot-leverage"
        checked={spotLeverageEnabled}
        onCheckedChange={() => setSpotLeverageEnabled(!spotLeverageEnabled)}
      />
    </Switch.Row>
  );
}
