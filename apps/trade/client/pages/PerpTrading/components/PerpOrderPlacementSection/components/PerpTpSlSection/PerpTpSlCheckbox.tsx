import { Checkbox } from '@vertex-protocol/web-ui';
import { CheckboxLabelWithTooltip } from 'client/components/CheckboxLabelWithTooltip';

interface Props {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  isDisabled: boolean;
}

export function PerpTpSlCheckbox({
  isChecked,
  setIsChecked,
  isDisabled,
}: Props) {
  return (
    <Checkbox.Row>
      <Checkbox.Check
        id="tpsl"
        checked={isChecked}
        onCheckedChange={setIsChecked}
        sizeVariant="xs"
        disabled={isDisabled}
      />
      <CheckboxLabelWithTooltip
        id="tpsl"
        definitionId="perpPositionsTpSl"
        sizeVariant="xs"
      >
        TP/SL
      </CheckboxLabelWithTooltip>
    </Checkbox.Row>
  );
}
