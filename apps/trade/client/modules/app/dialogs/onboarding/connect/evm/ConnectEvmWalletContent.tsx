import { BASE_CHAIN_ENVS, useEVMContext } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider, LinkButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { WalletButton } from 'client/components/WalletButton';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useResolvedConnectors } from 'client/modules/app/dialogs/onboarding/connect/evm/useResolvedConnectors';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

/**
 * Valid for all chains except for XRP
 */
export function ConnectEvmWalletContent({
  isGeoblocked,
}: {
  isGeoblocked: boolean;
}) {
  const { trackEvent } = useAnalyticsContext();
  const {
    connectionStatus,
    connect,
    connectors: baseConnectors,
  } = useEVMContext();
  const { connectorsWithMetadata, coinbaseConnector } =
    useResolvedConnectors(baseConnectors);

  const isDisabled = connectionStatus.type === 'connecting' || isGeoblocked;
  const showCoinbaseWalletPrompt =
    useIsEnabledForChainEnvs(BASE_CHAIN_ENVS) && !!coinbaseConnector;

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {connectorsWithMetadata.map(({ connector, metadata }) => {
          const isLoading =
            connectionStatus.type === 'connecting' &&
            connector.id === connectionStatus.connector?.id;
          const onClick = () => {
            if (isDisabled) {
              return;
            }
            connect(connector);
            trackEvent({
              type: 'wallet_connected',
              data: {
                walletName: connector.name,
              },
            });
          };

          return (
            <WalletButton
              key={connector.id}
              onClick={onClick}
              walletIcon={metadata.icon}
              walletName={metadata.name}
              isDisabled={isDisabled}
              isLoading={isLoading}
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
    </>
  );
}
