import { ConnectionStatus } from '@vertex-protocol/react-client';
import { useCopyText } from '@vertex-protocol/web-common';
import { LabelTooltip } from '@vertex-protocol/web-ui';
import { PrivacyToggleButton } from 'client/components/PrivacyToggleIcon';
import { AccountCenterWalletDisplayName } from 'client/modules/accountCenter/components/AccountCenterWalletDisplayName';

interface Props {
  isAddressPrivate: boolean;
  setIsAddressPrivate: (val: boolean) => void;
  connectionStatus: ConnectionStatus;
}

export function WalletAddressWithActions({
  isAddressPrivate,
  setIsAddressPrivate,
  connectionStatus,
}: Props) {
  const { isCopied, copy } = useCopyText();
  const copyText = isCopied ? 'Copied!' : 'Click to Copy';

  return (
    <div className="flex items-center gap-x-1.5">
      <LabelTooltip label={copyText} noHelpCursor>
        <AccountCenterWalletDisplayName
          className="text-text-primary cursor-pointer text-sm leading-tight"
          onClick={() => copy(connectionStatus?.address)}
        />
      </LabelTooltip>
      <PrivacyToggleButton
        colorVariant="secondary"
        isPrivate={isAddressPrivate}
        onClick={() => setIsAddressPrivate(!isAddressPrivate)}
      />
    </div>
  );
}
