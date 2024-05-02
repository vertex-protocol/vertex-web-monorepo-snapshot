import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SingleSignatureStatusIcon } from 'client/modules/singleSignatureSessions/components/SingleSignatureStatusIcon';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';

interface Props {
  disabled: boolean;
}

export function OneClickTradingButton({ disabled }: Props) {
  const isSignOnce = useIsSingleSignatureSession();
  const { show } = useDialog();

  const statusLabel = isSignOnce ? 'ON' : 'OFF';

  return (
    <SecondaryButton
      size="lg"
      onClick={() =>
        show({
          type: 'signature_mode_settings',
          params: {},
        })
      }
      className={joinClassNames(
        !disabled && 'ring-accent',
        'px-2 py-3 text-xs font-medium',
      )}
      startIcon={
        <SingleSignatureStatusIcon
          isSignOnce={isSignOnce}
          className={joinClassNames('text-sm', disabled && 'text-disabled')}
        />
      }
      disabled={disabled}
    >
      <p className="flex-1 text-left">One-Click Trading</p>
      <div className="flex items-center gap-x-0.5">
        <p>{statusLabel}</p>
        <Icons.FiChevronRight size={14} />
      </div>
    </SecondaryButton>
  );
}
