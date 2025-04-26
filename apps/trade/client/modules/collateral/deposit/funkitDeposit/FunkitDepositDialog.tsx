import { useFunkitVertexDeposit } from 'client/modules/collateral/deposit/funkitDeposit/useFunkitVertexDeposit';
import { useEffect, useRef } from 'react';
import '@funkit/connect/styles.css';

/**
 * Not really a dialog, but a "component" that encapsulates the logic to show the fun flow
 */
export function FunkitDepositDialog() {
  const hasStartedRef = useRef(false);
  const { startFunkitDeposit, isFunkitCheckoutReady } =
    useFunkitVertexDeposit();

  useEffect(() => {
    if (isFunkitCheckoutReady && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startFunkitDeposit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
