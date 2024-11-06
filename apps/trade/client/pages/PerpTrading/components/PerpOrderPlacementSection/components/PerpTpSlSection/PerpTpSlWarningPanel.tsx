import { WarningPanel } from 'client/components/WarningPanel';

const EXISTING_TPSL_MESSAGE =
  'Setting a TP/SL will replace your existing TP/SL orders.';
const EXISTING_POSITION_MESSAGE =
  'The TP/SL will be applied to your entire position.';

interface Props {
  hasExistingPosition: boolean;
  hasExistingTriggerOrder: boolean;
}

export function PerpTpSlWarningPanel({
  hasExistingPosition,
  hasExistingTriggerOrder,
}: Props) {
  if (!hasExistingPosition) {
    return null;
  }

  return (
    <WarningPanel>
      {hasExistingTriggerOrder
        ? EXISTING_TPSL_MESSAGE
        : EXISTING_POSITION_MESSAGE}
    </WarningPanel>
  );
}
