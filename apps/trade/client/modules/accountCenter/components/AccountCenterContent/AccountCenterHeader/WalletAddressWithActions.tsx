import { useCopyText } from '@vertex-protocol/web-common';
import { ConnectionStatus } from '@vertex-protocol/react-client';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { getTruncatedAddress } from 'client/utils/getTruncatedAddress';

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
  const { show } = useDialog();
  const { isCopied, copy } = useCopyText();

  const HideIcon = isAddressPrivate ? Icons.FiEyeOff : Icons.FiEye;
  const CopyIcon = isCopied ? Icons.MdCheck : Icons.MdContentCopy;

  // Hidden feature for MM's to access alternate subaccounts
  const onAddressClick = useRepeatedClickCountHandler({
    handler: (count) => {
      if (count === 3) {
        show({
          type: 'change_subaccount',
          params: {},
        });
      }
    },
  });

  // Hover on address to copy interaction
  return (
    <div className="flex items-center gap-x-1.5">
      <PrivateContent
        isPrivate={isAddressPrivate}
        onClick={onAddressClick}
        className="text-text-primary text-sm leading-tight"
      >
        {getTruncatedAddress(connectionStatus?.address ?? '', 4)}
      </PrivateContent>
      <TextButton onClick={() => copy(connectionStatus?.address)}>
        <CopyIcon size={14} />
      </TextButton>
      <TextButton onClick={() => setIsAddressPrivate(!isAddressPrivate)}>
        <HideIcon size={14} />
      </TextButton>
    </div>
  );
}
