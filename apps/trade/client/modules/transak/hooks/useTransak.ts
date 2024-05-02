import { Transak, TransakConfig } from '@transak/transak-sdk';
import { useEVMContext } from '@vertex-protocol/web-data';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { useCallback, useMemo } from 'react';
import { arbitrum, arbitrumSepolia } from 'viem/chains';

export function useTransak() {
  const { connectionStatus, primaryChain } = useEVMContext();

  const transakConfig: TransakConfig | undefined = useMemo(() => {
    switch (primaryChain.id) {
      case arbitrum.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'arbitrum',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case arbitrumSepolia.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'arbitrum',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      default:
        return undefined;
    }
  }, [primaryChain.id, connectionStatus.address]);

  const transak = useMemo(() => {
    if (!transakConfig) {
      return;
    }
    return new Transak(transakConfig);
  }, [transakConfig]);

  const showTransakDialog = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    transak?.init();

    return () => {
      transak?.close();
    };
  }, [transak]);

  return {
    showTransakDialog,
  };
}
