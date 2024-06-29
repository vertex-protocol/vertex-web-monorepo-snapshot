import { useEVMContext } from '@vertex-protocol/react-client';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useResolvedConnectors } from 'client/modules/app/dialogs/wallet/states/connect/useResolvedConnectors';
import { WalletButton } from 'client/modules/app/dialogs/wallet/states/connect/WalletButton';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { NoWalletInstructions } from './NoWalletInstructions';

export function ConnectWalletDialogContent() {
  const { hide } = useDialog();
  const {
    connectionStatus,
    connect,
    connectors: baseConnectors,
  } = useEVMContext();
  const connectorsWithMetadata = useResolvedConnectors(baseConnectors);

  const isDisabled = connectionStatus.type === 'connecting';

  return (
    <>
      <BaseDialog.Title onClose={hide}>Connect Wallet</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          {connectorsWithMetadata.map(({ connector, metadata }) => {
            const isLoading =
              connectionStatus.type === 'connecting' &&
              connector.id === connectionStatus.connector?.id;

            return (
              <WalletButton
                key={connector.id}
                connector={connector}
                metadata={metadata}
                isDisabled={isDisabled}
                isLoading={isLoading}
                connect={connect}
              />
            );
          })}
        </div>
        <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
          <NoWalletInstructions />
        </ChainSpecificContent>
      </BaseDialog.Body>
    </>
  );
}
