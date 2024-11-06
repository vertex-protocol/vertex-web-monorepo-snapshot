import { createWallet } from '@passkeys/core';
import { WalletProvider } from '@passkeys/react';
import { clientEnv } from 'common/environment/clientEnv';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { ReactNode, useMemo } from 'react';

export function ExodusWalletProvider({
  children,
}: {
  children: NonNullable<ReactNode>;
}) {
  // Exodus is only supported on Vertex chains, so only wrap with the provider if the brand is Vertex
  // There was an issue where their `WalletProvider` will freeze `wagmi` in a `connecting` state if the provider is used on a non-supported chain
  const exodusWallet = useMemo(() => {
    if (clientEnv.base.brandName === 'vertex') {
      return createWallet({
        appId: SENSITIVE_DATA.exodusWalletAppId,
        providers: {
          ethereum: true,
        },
      });
    }
  }, []);

  if (exodusWallet) {
    return <WalletProvider wallet={exodusWallet}>{children}</WalletProvider>;
  }

  return children;
}
