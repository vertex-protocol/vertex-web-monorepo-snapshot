import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { SpotOrderFormUserStateError } from 'client/pages/SpotTrading/context/types';
import { useMemo } from 'react';

interface Params {
  spotLeverageEnabled: boolean;
}

/**
 * Returns, if applicable, any errors in the current user state. This includes things like not being connected
 * or not having made an initial deposit
 */
export function useSpotOrderFormUserStateError({
  spotLeverageEnabled,
}: Params): SpotOrderFormUserStateError | undefined {
  const userStateError = useUserStateError();
  const { shouldShow: shouldShowLeverageDisclosure } = useShowUserDisclosure(
    'spot_leverage_on_risk',
  );

  return useMemo(() => {
    if (userStateError) {
      return userStateError;
    }
    if (spotLeverageEnabled && shouldShowLeverageDisclosure) {
      return 'requires_accept_leverage';
    }
  }, [userStateError, spotLeverageEnabled, shouldShowLeverageDisclosure]);
}
