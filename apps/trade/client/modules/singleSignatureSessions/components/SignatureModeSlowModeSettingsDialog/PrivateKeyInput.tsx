import {
  WithClassnames,
  joinClassNames,
  useCopyText,
} from '@vertex-protocol/web-common';
import {
  Button,
  ErrorTooltip,
  IconType,
  Icons,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { useToggle } from 'ahooks';
import { Input } from 'client/components/Input/Input';
import {
  SignatureModeSlowModeSettingsFormErrorType,
  SignatureModeSlowModeSettingsFormValues,
} from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props extends WithClassnames {
  form: UseFormReturn<SignatureModeSlowModeSettingsFormValues>;
  setRandomPrivateKey: () => void;
  validatePrivateKey: (
    input: string,
  ) => SignatureModeSlowModeSettingsFormErrorType | undefined;
  // Disables the input and all associated actions
  disabled: boolean;
  error: ReactNode;
}

export function PrivateKeyInput({
  error,
  form,
  setRandomPrivateKey,
  validatePrivateKey,
  disabled,
}: Props) {
  // Copy button
  const { isCopied, copy } = useCopyText();
  const CopyButton = isCopied ? Icons.MdCheck : Icons.MdContentCopy;
  const onCopyClick = () => {
    copy(form.getValues('privateKey'));
  };

  // Show/Hide button
  const [isPrivateKeyHidden, { toggle: toggleIsPrivateKeyHidden }] =
    useToggle(true);
  const ShowHideButton = isPrivateKeyHidden ? Icons.BsEyeSlash : Icons.BsEye;

  return (
    <div className="flex flex-col gap-y-2">
      {/*Label*/}
      <div className="flex items-center justify-between">
        <div className="text-text-primary">1CT Private Key</div>
        <SecondaryButton
          size="sm"
          onClick={setRandomPrivateKey}
          startIcon={<Icons.MdOutlineRefresh />}
          disabled={disabled}
        >
          Generate
        </SecondaryButton>
      </div>
      {/*Input*/}
      <div className="flex gap-x-1">
        <ErrorTooltip contentWrapperClassName="flex-1" errorContent={error}>
          <Input
            className={joinClassNames(
              'bg-surface-card h-10 flex-1 transition',
              'rounded border',
              'px-3',
              'placeholder:text-disabled text-text-primary text-sm',
              form.formState.errors.privateKey
                ? 'border-negative'
                : 'focus:border-accent border-stroke',
            )}
            {...form.register('privateKey', {
              validate: validatePrivateKey,
            })}
            type={isPrivateKeyHidden ? 'password' : 'text'}
            disabled={disabled}
          />
        </ErrorTooltip>
        <IconButton
          icon={ShowHideButton}
          onClick={toggleIsPrivateKeyHidden}
          disabled={disabled}
        />
        <IconButton
          icon={CopyButton}
          onClick={onCopyClick}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function IconButton({
  icon: Icon,
  onClick,
  disabled,
}: {
  onClick(): void;
  icon: IconType;
  disabled: boolean;
}) {
  return (
    <Button
      className="hover:text-text-primary px-1 text-lg"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon />
    </Button>
  );
}
