import { useEVMContext } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider, LinkButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useResolvedConnectors } from 'client/modules/app/dialogs/wallet/states/connect/useResolvedConnectors';
import { WalletButton } from 'client/modules/app/dialogs/wallet/states/connect/WalletButton';
import { BASE_CHAIN_ENVS } from '@vertex-protocol/react-client';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function ConnectWalletDialogContent() {
  const { hide } = useDialog();
  const {
    connectionStatus,
    connect,
    connectors: baseConnectors,
  } = useEVMContext();
  const { connectorsWithMetadata, coinbaseConnector } =
    useResolvedConnectors(baseConnectors);

  const isDisabled = connectionStatus.type === 'connecting';
  const showCoinbaseWalletPrompt =
    useIsEnabledForChainEnvs(BASE_CHAIN_ENVS) && !!coinbaseConnector;

  return (
    <>
      <BaseAppDialog.Title onClose={hide}>Connect Wallet</BaseAppDialog.Title>
      <BaseAppDialog.Body>
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
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-0.5">
            <div className="text-text-primary">Don&apos;t see your wallet?</div>
            <div className="text-text-tertiary">
              WalletConnect supports 50+ options
            </div>
          </div>
          <Divider />
          <div
            className={joinClassNames(
              'flex flex-col',
              // Add a larger gap when showing a primary button for coinbase wallet
              showCoinbaseWalletPrompt ? 'gap-y-2' : 'gap-y-0.5',
            )}
          >
            <div className="text-text-primary">Don&apos;t have a wallet?</div>
            {showCoinbaseWalletPrompt ? (
              <PrimaryButton
                disabled={isDisabled}
                onClick={() => {
                  if (!coinbaseConnector) {
                    return;
                  }
                  connect(coinbaseConnector.connector);
                }}
                className={isDisabled ? '' : 'bg-[#2C5FF6]'}
                startIcon={coinbaseConnector.metadata.icon}
              >
                Create One with Coinbase
              </PrimaryButton>
            ) : (
              <LinkButton
                as={Link}
                className="w-max"
                colorVariant="primary"
                href={LINKS.ethWallets}
                external
                withExternalIcon
              >
                Create One
              </LinkButton>
            )}
          </div>
        </div>
      </BaseAppDialog.Body>
    </>
  );
}
