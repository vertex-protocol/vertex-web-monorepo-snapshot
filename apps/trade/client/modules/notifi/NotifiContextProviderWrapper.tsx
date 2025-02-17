import { NotifiContextProvider } from '@notifi-network/notifi-react';
import { useEVMContext } from '@vertex-protocol/react-client';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { toBytes } from 'viem';

interface EnvironmentConfig {
  env: 'Production' | 'Development';
}

interface NotifiConfig extends EnvironmentConfig {
  cardId: string;
}

export function NotifiContextProviderWrapper({ children }: any) {
  const {
    connectionStatus: { connector, address: account, signer },
    primaryChainEnv,
  } = useEVMContext();
  const notifiConfig = ((): NotifiConfig | undefined => {
    switch (primaryChainEnv) {
      case 'arbitrum':
        return {
          env: 'Production',
          cardId: SENSITIVE_DATA.notifiCardId.arbitrumProd,
        };
      case 'mantle':
        return {
          env: 'Production',
          cardId: SENSITIVE_DATA.notifiCardId.mantleProd,
        };
      case 'blast':
        return {
          env: 'Production',
          cardId: SENSITIVE_DATA.notifiCardId.blastProd,
        };
      case 'base':
        return {
          env: 'Production',
          cardId: SENSITIVE_DATA.notifiCardId.baseProd,
        };
      case 'arbitrumTestnet':
      case 'mantleTestnet':
      case 'blastTestnet':
      case 'baseTestnet':
        return {
          env: 'Production',
          //we use arbitrumTestnet for test in testnet purpose, we are only support arbitrum chain test in testnet
          cardId: SENSITIVE_DATA.notifiCardId.arbitrumTestnet,
        };
      default:
        return;
    }
  })();

  if (!account || !signer || !notifiConfig || !connector) {
    return null;
  }

  const signMessage = async (message: Uint8Array) => {
    const result = (await signer?.signMessage(message)) ?? '';
    return toBytes(result);
  };

  const isCoinbaseWallet = connector?.id === 'com.coinbase.wallet';

  return (
    <NotifiContextProvider
      tenantId="vertex"
      env={notifiConfig.env}
      toggleTargetAvailability={{ wallet: isCoinbaseWallet }}
      cardId={notifiConfig.cardId}
      walletBlockchain="ARBITRUM"
      walletPublicKey={account}
      signMessage={signMessage}
      inputs={{
        walletAddress: [{ label: '', value: account }],
      }}
    >
      {children}
    </NotifiContextProvider>
  );
}
