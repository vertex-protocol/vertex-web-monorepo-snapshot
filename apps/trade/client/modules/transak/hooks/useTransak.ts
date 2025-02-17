import { Transak, TransakConfig } from '@transak/transak-sdk';
import { useEVMContext } from '@vertex-protocol/react-client';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { useCallback, useEffect, useMemo } from 'react';

export function useTransak() {
  const { connectionStatus, primaryChainEnv } = useEVMContext();

  const transakConfig: TransakConfig | undefined = useMemo(() => {
    switch (primaryChainEnv) {
      case 'arbitrum':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'arbitrum',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case 'arbitrumTestnet':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'arbitrum',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case 'base':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'base',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case 'baseTestnet':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'base',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case 'mantle':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'mantle',
          defaultCryptoCurrency: 'usdt',
          walletAddress: connectionStatus.address,
        };
      case 'mantleTestnet':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'mantle',
          defaultCryptoCurrency: 'usdt',
          walletAddress: connectionStatus.address,
        };
      case 'sei':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'sei',
          defaultCryptoCurrency: 'sei',
          walletAddress: connectionStatus.address,
        };
      case 'seiTestnet':
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'sei',
          defaultCryptoCurrency: 'sei',
          walletAddress: connectionStatus.address,
        };
      default:
        return undefined;
    }
  }, [primaryChainEnv, connectionStatus.address]);

  const transak = useMemo(() => {
    if (!transakConfig) {
      return;
    }
    return new Transak(transakConfig);
  }, [transakConfig]);

  useEffect(() => {
    return () => {
      transak?.close();
    };
  }, [transak]);

  const showTransakDialog = useCallback(() => {
    if (typeof window === 'undefined' || !transak) {
      return;
    }
    transak.init();

    // This will trigger when the user closes the widget
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
    });
  }, [transak]);

  return {
    showTransakDialog,
  };
}
