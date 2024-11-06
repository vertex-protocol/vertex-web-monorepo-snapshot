import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';
import { useIsConnected } from 'client/hooks/util/useIsConnected';

export function useShowLeverageWarnings() {
  const isConnected = useIsConnected();

  const { spotLeverageEnabled } = useSpotLeverageEnabled();
  const { shouldShow: shouldShowLeverageOnDisclosure } = useShowUserDisclosure(
    'spot_leverage_on_risk',
  );
  const { shouldShow: shouldShowLeverageOffDisclosure } = useShowUserDisclosure(
    'spot_leverage_off_orders',
  );

  // Show the leverage ON warning when user enables leverage but hasn't yet accepted the disclosure
  const showLeverageOnWarning =
    isConnected && spotLeverageEnabled && shouldShowLeverageOnDisclosure;
  // Show the leverage OFF warning when the user first toggles leverage from ON -> OFF
  // A heuristic here is that the user has already accepted spot leverage, but leverage is not currently enabled
  const showLeverageOffWarning =
    isConnected &&
    !spotLeverageEnabled &&
    !shouldShowLeverageOnDisclosure &&
    shouldShowLeverageOffDisclosure;

  return {
    showLeverageOnWarning,
    showLeverageOffWarning,
  };
}
