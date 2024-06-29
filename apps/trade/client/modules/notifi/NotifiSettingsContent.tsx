import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from '@notifi-network/notifi-react-card';
import { NotifiEnvironment } from '@notifi-network/notifi-react-hooks';
import { useEVMContext } from '@vertex-protocol/react-client';
import { arbitrum, arbitrumSepolia } from '@wagmi/core/chains';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { toBytes } from 'viem';

const INPUT_LABELS: NotifiInputFieldsText = {
  label: {
    email: 'Email',
    sms: 'Text Message',
    telegram: 'Telegram',
  },
  placeholderText: {
    email: 'Email',
  },
};

const INPUT_SEPARATORS: NotifiInputSeparators = {
  telegramSeparator: {
    content: ' ',
  },
  emailSeparator: {
    content: ' ',
  },
};

const COPY = {
  FetchedStateCard: {
    SubscriptionCardV1: {
      EditCard: {
        AlertListPreview: {
          description:
            'Get real-time alerts to the destinations of your choice',
        },
      },
    },
  },
};

export function NotifiSettingsContent() {
  const { connectionStatus, primaryChain } = useEVMContext();
  const signer = connectionStatus.signer;
  const account = connectionStatus.address;

  const notifiConfig = (():
    | { env: NotifiEnvironment; cardId: string }
    | undefined => {
    switch (primaryChain.id) {
      case arbitrum.id:
        return {
          env: 'Production',
          cardId: SENSITIVE_DATA.notifiCardId.prod,
        };
      case arbitrumSepolia.id:
        return {
          env: 'Development',
          cardId: SENSITIVE_DATA.notifiCardId.dev,
        };
    }
  })();

  if (!account || !signer || !notifiConfig) {
    return null;
  }

  const signMessage = async (message: Uint8Array) => {
    const result = (await signer?.signMessage(message)) ?? '';
    return toBytes(result);
  };

  return (
    <>
      <NotifiContext
        env={notifiConfig.env}
        dappAddress="vertex"
        walletBlockchain="ARBITRUM"
        walletPublicKey={account}
        signMessage={signMessage}
      >
        <NotifiSubscriptionCard
          inputs={{ userWallet: account }}
          inputLabels={INPUT_LABELS}
          inputSeparators={INPUT_SEPARATORS}
          cardId={notifiConfig.cardId}
          copy={COPY}
          darkMode
        />
      </NotifiContext>
    </>
  );
}
