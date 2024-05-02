import { getTruncatedAddress, useCopyText } from '@vertex-protocol/web-common';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ConnectionStatus } from '@vertex-protocol/web-data';

interface Props {
  isAddressPrivate: boolean;
  connectionStatus: ConnectionStatus;
}

export function ControlCenterWalletAddress({
  isAddressPrivate,
  connectionStatus,
}: Props) {
  const { show } = useDialog();
  const { isCopied, copy } = useCopyText();

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
    <div className="group flex items-center gap-x-1.5">
      <PrivateContent isPrivate={isAddressPrivate} onClick={onAddressClick}>
        {getTruncatedAddress(connectionStatus?.address ?? '', 4)}
      </PrivateContent>
      <TextButton
        className="invisible flex items-center group-hover:visible"
        onClick={() => copy(connectionStatus?.address)}
      >
        {isCopied ? (
          <Icons.MdCheck size={16} />
        ) : (
          <Icons.MdContentCopy size={16} />
        )}
      </TextButton>
    </div>
  );
}
