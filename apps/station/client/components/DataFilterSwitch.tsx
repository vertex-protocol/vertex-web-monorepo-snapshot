import { Switch } from '@vertex-protocol/web-ui';

interface Props {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export function DataFilterSwitch({
  id,
  checked,
  onCheckedChange,
  label,
}: Props) {
  return (
    <Switch.Row className="justify-normal gap-x-2">
      <Switch.Label id={id}>{label}</Switch.Label>
      <Switch.Toggle
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </Switch.Row>
  );
}
