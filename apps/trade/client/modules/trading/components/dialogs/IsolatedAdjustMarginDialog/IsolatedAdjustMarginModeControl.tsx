import { SegmentedControl } from '@vertex-protocol/web-ui';
import { IsolatedAdjustMarginMode } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';

interface Props {
  isAddMargin: boolean;
  onAdjustmentModeChange: (mode: IsolatedAdjustMarginMode) => void;
}
export function IsolatedAdjustMarginModeControl({
  isAddMargin,
  onAdjustmentModeChange,
}: Props) {
  return (
    <SegmentedControl.Container className="grid grid-cols-2">
      <SegmentedControl.Button
        active={isAddMargin}
        onClick={() => onAdjustmentModeChange('add')}
      >
        Add
      </SegmentedControl.Button>
      <SegmentedControl.Button
        active={!isAddMargin}
        onClick={() => onAdjustmentModeChange('remove')}
      >
        Remove
      </SegmentedControl.Button>
    </SegmentedControl.Container>
  );
}
