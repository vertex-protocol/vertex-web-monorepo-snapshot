import { WithClassnames, mergeClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SignatureModeSlowModeEntrypoint({ className }: WithClassnames) {
  const { show } = useDialog();

  return (
    <div className={mergeClassNames('text-xs', className)}>
      Using a Safe or another smart contract wallet?{' '}
      <LinkButton
        color="white"
        onClick={() => {
          show({
            type: 'signature_mode_slow_mode_settings',
            params: {},
          });
        }}
      >
        Click Here
      </LinkButton>
    </div>
  );
}
