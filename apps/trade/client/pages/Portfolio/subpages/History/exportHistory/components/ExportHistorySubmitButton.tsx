import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
  onClick: () => void;
}

export function ExportHistorySubmitButton({
  state,
  onClick,
  className,
}: Props) {
  const message = {
    loading: 'Preparing Data',
    success: <ButtonStateContent.Success message="Export Complete" />,
    idle: 'Export',
    disabled: 'Export',
  }[state];

  return (
    <PrimaryButton
      className={className}
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
      onClick={onClick}
    >
      {message}
    </PrimaryButton>
  );
}
