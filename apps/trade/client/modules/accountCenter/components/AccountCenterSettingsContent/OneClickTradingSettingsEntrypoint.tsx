import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

export function OneClickTradingSettingsEntrypoint() {
  const { show } = useDialog();
  const isSingleSignatureSession = useIsSingleSignatureSession();
  const userActionState = useUserActionState();

  return (
    <TextButton
      className="text-sm"
      disabled={userActionState !== 'allow_all'}
      onClick={() => {
        show({
          type: 'signature_mode_settings',
          params: {},
        });
      }}
      endIcon={<Icons.FiChevronRight size={16} />}
    >
      <DefinitionTooltip contentWrapperClassName="text-text-primary mr-auto">
        One-Click Trading
      </DefinitionTooltip>
      {isSingleSignatureSession ? 'ON' : 'OFF'}
    </TextButton>
  );
}
