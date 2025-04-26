import { Switch } from '@vertex-protocol/web-ui';

interface Props {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export function SlowModeEnable1CTSwitch({ checked, onCheckedChange }: Props) {
  return (
    <Switch.Row>
      <Switch.Label id="enable-1ct">Enable 1CT</Switch.Label>
      <Switch.Toggle
        id="enable-1ct"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </Switch.Row>
  );
}
