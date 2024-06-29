import { TextButton } from '@vertex-protocol/web-ui/components/Button/TextButton';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';

export function TriggerOrderEnableOneClickTradingInfo() {
  const { show } = useDialog();
  const userActionState = useUserActionState();
  const isSingleSignatureSession = useIsSingleSignatureSession();

  if (userActionState !== 'allow_all' || isSingleSignatureSession) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-y-3">
      <p>
        Switch your trading mode to One-Click Trading to enable Stop Market
        Orders.
      </p>
      <TextButton
        onClick={() => show({ type: 'signature_mode_settings', params: {} })}
        className="text-text-primary underline"
      >
        Enable One-Click Trading
      </TextButton>
    </div>
  );
}
