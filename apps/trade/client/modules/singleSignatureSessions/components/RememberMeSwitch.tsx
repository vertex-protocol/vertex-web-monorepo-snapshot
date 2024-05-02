import { Switch } from '@vertex-protocol/web-ui';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';

interface Props {
  checked: boolean;
  disabled?: boolean;

  onCheckedChange(checked: boolean): void;
}

export function RememberMeSwitch({
  checked,
  disabled,
  onCheckedChange,
}: Props) {
  return (
    <Switch.Row disabled={disabled}>
      <SwitchLabelWithTooltip id="remember-me" definitionId="octRememberMe">
        Remember Me
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="remember-me"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </Switch.Row>
  );
}
