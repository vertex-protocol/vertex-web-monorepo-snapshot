import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';
import { useEVMContext } from '@vertex-protocol/react-client';

export function useShowLeverageWarnings() {
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

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
