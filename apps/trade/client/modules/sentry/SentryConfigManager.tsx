import * as Sentry from '@sentry/nextjs';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { clientEnv } from 'common/environment/clientEnv';
import { ZeroAddress } from 'ethers';
import { useEffect } from 'react';

Sentry.setTag('data_env', clientEnv.base.dataEnv);

// Responsible for setting the proper configuration on the FE Sentry instance
export function SentryConfigManager() {
  const { currentSubaccount } = useSubaccountContext();

  useEffect(() => {
    const userId = getSentryUserId(
      currentSubaccount?.address,
      currentSubaccount.name,
    );

    Sentry.setUser({
      id: userId,
      wallet_address: currentSubaccount?.address,
      subaccount_name: currentSubaccount.name,
    });
  }, [currentSubaccount]);

  return null;
}

function getSentryUserId(address: string | undefined, subaccountName: string) {
  return `${address ?? ZeroAddress}-${subaccountName}`;
}
