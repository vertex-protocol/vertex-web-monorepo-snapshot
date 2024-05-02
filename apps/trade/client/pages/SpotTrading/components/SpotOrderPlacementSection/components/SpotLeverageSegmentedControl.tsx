import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';

export function SpotLeverageSegmentedControl({ className }: WithClassnames) {
  const { spotLeverageEnabled, setSpotLeverageEnabled } =
    useSpotLeverageEnabled();

  return (
    <div
      className={joinClassNames(
        'flex items-center justify-between',
        'text-text-secondary text-xs',
        className,
      )}
    >
      <DefinitionTooltip
        definitionId="spotLeverageToggle"
        decoration={{ icon: { size: 14 } }}
      >
        Leveraged Spot
      </DefinitionTooltip>
      <SegmentedControl.Container className="w-24">
        <SegmentedControl.Button
          size="sm"
          active={!spotLeverageEnabled}
          onClick={() => {
            setSpotLeverageEnabled(false);
          }}
          className="flex-1 uppercase"
        >
          Off
        </SegmentedControl.Button>
        <SegmentedControl.Button
          size="sm"
          active={spotLeverageEnabled}
          onClick={() => setSpotLeverageEnabled(true)}
          className={joinClassNames(
            'flex-1 uppercase',
            spotLeverageEnabled && 'text-accent',
          )}
        >
          On
        </SegmentedControl.Button>
      </SegmentedControl.Container>
    </div>
  );
}
