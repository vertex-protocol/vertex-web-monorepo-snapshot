import { ButtonHelperInfo, PrimaryButton } from '@vertex-protocol/web-ui';
import { useConnectXrpWalletContent } from 'client/modules/app/dialogs/onboarding/connect/xrp/useConnectXrpWalletContent';
import { XrpWalletConnection } from 'client/modules/xrp/components/XrpWalletConnection/XrpWalletConnection';

export function ConnectXrpWalletContent({
  isGeoblocked,
}: {
  isGeoblocked: boolean;
}) {
  const {
    connectedXrpConnector,
    createLinkedSignerAndConnectEvmWallet,
    createXrpLinkedSignerStatus,
  } = useConnectXrpWalletContent();
  const isDisabled = isGeoblocked;
  const isCreatingLinkedSigner = createXrpLinkedSignerStatus === 'pending';

  return (
    <>
      <XrpWalletConnection />
      {connectedXrpConnector && (
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col items-start gap-y-1">
            <span className="text-text-primary text-base">
              Enable 1-Click Trading
            </span>
            <span className="text-text-tertiary text-xs">
              1-Click Trading is required for XRPL wallets. Sign a message to
              start your trading session. You won&apos;t need to sign again
              unless you disconnect your wallet.
            </span>
          </div>
          <ButtonHelperInfo.Container>
            <PrimaryButton
              onClick={createLinkedSignerAndConnectEvmWallet}
              disabled={isDisabled}
              isLoading={isCreatingLinkedSigner}
            >
              Enable 1-Click Trading
            </PrimaryButton>
            {isCreatingLinkedSigner && (
              <ButtonHelperInfo.Content>
                Check your wallet for a signature request.
              </ButtonHelperInfo.Content>
            )}
          </ButtonHelperInfo.Container>
        </div>
      )}
    </>
  );
}
