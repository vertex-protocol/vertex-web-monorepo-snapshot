import { Transak, TransakConfig } from '@transak/transak-sdk';
import { useEVMContext } from '@vertex-protocol/react-client';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { useCallback, useMemo } from 'react';
import {
  arbitrum,
  arbitrumSepolia,
  baseSepolia,
  mantle,
  mantleSepoliaTestnet,
  seiTestnet,
  sei,
} from 'viem/chains';

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
      case baseSepolia.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'base',
          defaultCryptoCurrency: 'usdc',
          walletAddress: connectionStatus.address,
        };
      case mantle.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'mantle',
          defaultCryptoCurrency: 'usdt',
          walletAddress: connectionStatus.address,
        };
      case mantleSepoliaTestnet.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'mantle',
          defaultCryptoCurrency: 'usdt',
          walletAddress: connectionStatus.address,
        };
      case seiTestnet.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.staging,
          environment: Transak.ENVIRONMENTS.STAGING,
          defaultNetwork: 'sei',
          defaultCryptoCurrency: 'sei',
          walletAddress: connectionStatus.address,
        };
      case sei.id:
        return {
          apiKey: SENSITIVE_DATA.transakApiKey.prod,
          environment: Transak.ENVIRONMENTS.PRODUCTION,
          defaultNetwork: 'sei',
          defaultCryptoCurrency: 'sei',
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
