import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { TriggerOrderEnableOneClickTradingInfo } from 'client/modules/trading/components/TriggerOrderEnableOneClickTradingInfo';

export function TriggerOrderPlaceholderContent() {
  const isConnected = useIsConnected();
  const isSingleSignatureSession = useIsSingleSignatureSession();

  const showCta = isConnected && !isSingleSignatureSession;

  return (
    <div className="flex flex-col items-start gap-y-3">
      <p>Your open trigger orders will appear here.</p>
      {showCta && <TriggerOrderEnableOneClickTradingInfo />}
    </div>
  );
}
