import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

export function OneClickTradingSettingsEntrypoint() {
  const { push } = useDialog();
  const isSingleSignatureSession = useIsSingleSignatureSession();

  return (
    <TextButton
      colorVariant="secondary"
      className="text-sm"
      onClick={() => {
        push({
          type: 'signature_mode_settings',
          params: {},
        });
      }}
      endIcon={<Icons.CaretRight size={16} />}
    >
      <DefinitionTooltip contentWrapperClassName="text-text-primary mr-auto">
        One-Click Trading
      </DefinitionTooltip>
      {isSingleSignatureSession ? 'ON' : 'OFF'}
    </TextButton>
  );
}
