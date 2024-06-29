import { Icons, NavCardButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props {
  isOnrampEnabled: boolean;
  isBridgeEnabled: boolean;
}

export function DepositFooter({ isOnrampEnabled, isBridgeEnabled }: Props) {
  const { show } = useDialog();

  if (!isOnrampEnabled && !isBridgeEnabled) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-y-3">
      <span className="text-text-primary text-sm">More Options</span>
      <div className="flex w-full flex-col">
        {isBridgeEnabled && (
          <NavCardButton
            title="Cross-Chain Deposit"
            description="Deposit from 8+ chains"
            icon={Icons.PiShuffleSimple}
            onClick={() => show({ type: 'bridge', params: {} })}
          />
        )}
        {isOnrampEnabled && (
          <NavCardButton
            title="Buy Crypto"
            description="Purchase with fiat"
            icon={Icons.PiCurrencyCircleDollarBold}
            onClick={() => show({ type: 'transak_onramp_notice', params: {} })}
          />
        )}
      </div>
    </div>
  );
}
