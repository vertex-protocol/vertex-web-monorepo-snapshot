import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { WALLET_BUTTON_ICON_SIZE_CLASSNAME } from 'client/modules/app/dialogs/wallet/states/connect/consts';
import { ConnectorMetadata } from 'client/modules/app/dialogs/wallet/states/connect/customConnectorMetadata';
import { Connector } from 'wagmi';

interface Props extends WithClassnames {
  connector: Connector;
  metadata: ConnectorMetadata;
  isLoading: boolean;
  isDisabled: boolean;

  connect(connector: Connector): void;
}

export function WalletButton({
  className,
  connector,
  metadata,
  connect,
  isLoading,
  isDisabled,
}: Props) {
  const { trackEvent } = useAnalyticsContext();
  const connectorIcon = (() => {
    // Resolved external icon URL
    if (typeof metadata.icon === 'string') {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={metadata.icon}
          className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
          alt={metadata.name}
        />
      );
    }
    return metadata.icon;
  })();

  return (
    <SecondaryButton
      className={joinClassNames(
        'flex items-center justify-start px-2 py-3',
        'text-text-primary',
        className,
      )}
      onClick={() => {
        connect(connector);
        trackEvent({
          type: 'wallet_connected',
          data: {
            walletName: connector.name,
          },
        });
      }}
      isLoading={isLoading}
      disabled={isDisabled}
      startIcon={connectorIcon}
    >
      {isLoading ? 'Waiting for wallet' : metadata.name}
    </SecondaryButton>
  );
}
