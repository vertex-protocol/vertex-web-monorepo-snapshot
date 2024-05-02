import { useEVMContext } from '@vertex-protocol/web-data';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useResolvedConnectors } from 'client/modules/app/dialogs/wallet/states/connect/useResolvedConnectors';
import { WalletButton } from 'client/modules/app/dialogs/wallet/states/connect/WalletButton';
import { NoWalletInstructions } from './NoWalletInstructions';
import { ChainSpecificContent } from 'client/modules/chainSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

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
      <BaseDialog.Body className="flex flex-col gap-y-9">
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
