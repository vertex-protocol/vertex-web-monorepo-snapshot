import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

export function SignatureModeNumSwitchesRemaining({
  numSwitchesRemaining,
  totalTxLimit,
  className,
}: WithClassnames<{
  numSwitchesRemaining?: number;
  totalTxLimit?: number;
}>) {
  if (numSwitchesRemaining == null || totalTxLimit == null) return null;

  const numSwitchesRemainingClassName = (() => {
    if (numSwitchesRemaining === 1) {
      return 'text-negative';
    }
    if (numSwitchesRemaining === 0) {
      return 'text-negative';
    }
    return 'text-text-primary';
  })();

  return (
    <div
      className={joinClassNames(
        'flex items-center justify-between gap-x-1.5 text-xs',
        className,
      )}
    >
      <DefinitionTooltip
        decoration={{ icon: true }}
        definitionId="octRemainingActivations"
        contentWrapperClassName="text-text-primary"
      >
        Remaining Activations
      </DefinitionTooltip>
      <span className={numSwitchesRemainingClassName}>
        {numSwitchesRemaining}/{totalTxLimit}
      </span>
    </div>
  );
}
