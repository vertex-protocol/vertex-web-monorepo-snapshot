import { TextButton } from '@vertex-protocol/web-ui/components/Button/TextButton';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';

export function TriggerOrderEnableOneClickTradingInfo() {
  const { show } = useDialog();

  const isSingleSignatureSession = useIsSingleSignatureSession();
  const isConnected = useIsConnected();

  if (!isConnected || isSingleSignatureSession) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-y-3">
      <p>
        Switch your trading mode to One-Click Trading to enable Stop Market
        Orders.
      </p>
      <TextButton
        colorVariant="secondary"
        onClick={() => show({ type: 'signature_mode_settings', params: {} })}
        className="underline"
      >
        Enable One-Click Trading
      </TextButton>
    </div>
  );
}
