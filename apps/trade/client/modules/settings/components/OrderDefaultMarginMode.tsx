import { WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useCallback } from 'react';

export function OrderDefaultMarginMode() {
  return (
    <div className="flex flex-col gap-y-3">
      <DefinitionTooltip
        contentWrapperClassName="w-fit"
        definitionId="settingsDefaultMarginMode"
      >
        Default Margin Mode
      </DefinitionTooltip>
      <OrderDefaultMarginModeSegmentedControl />
    </div>
  );
}

function OrderDefaultMarginModeSegmentedControl({ className }: WithClassnames) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const defaultMarginMode = savedUserSettings.trading.marginMode.default;

  const setDefaultMarginMode = useCallback(
    (defaultMode: MarginModeType) =>
      setSavedUserSettings((prev) => {
        prev.trading.marginMode.default = defaultMode;
        return prev;
      }),
    [setSavedUserSettings],
  );

  return (
    <SegmentedControl.Container className={className}>
      <SegmentedControl.Button
        active={defaultMarginMode === 'cross'}
        className="flex-1"
        onClick={() => setDefaultMarginMode('cross')}
      >
        Cross
      </SegmentedControl.Button>
      <SegmentedControl.Button
        active={defaultMarginMode === 'isolated'}
        className="flex-1"
        onClick={() => setDefaultMarginMode('isolated')}
      >
        Isolated
      </SegmentedControl.Button>
    </SegmentedControl.Container>
  );
}
