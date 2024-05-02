import { WithClassnames } from '@vertex-protocol/web-common';
import { Switch } from '@vertex-protocol/web-ui';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';

interface Props extends WithClassnames {
  enableBorrows: boolean;

  onEnableBorrowsChange(enabled: boolean): void;
}

export function EnableBorrowsSwitch({
  className,
  enableBorrows,
  onEnableBorrowsChange,
}: WithClassnames<Props>) {
  return (
    <Switch.Row className={className}>
      <SwitchLabelWithTooltip
        id="enable-borrowing"
        definitionId="withdrawEnableBorrowsSwitch"
      >
        Enable borrowing
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="enable-borrowing"
        checked={enableBorrows}
        onCheckedChange={onEnableBorrowsChange}
      />
    </Switch.Row>
  );
}
