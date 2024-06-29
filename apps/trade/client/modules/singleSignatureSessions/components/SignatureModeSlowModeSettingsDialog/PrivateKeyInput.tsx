import { WithClassnames, useCopyText } from '@vertex-protocol/web-common';
import {
  CompactInput,
  IconButton,
  Icons,
  Input,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { useToggle } from 'ahooks';
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

  const register = form.register('privateKey', {
    validate: validatePrivateKey,
  });

  return (
    <div className="flex flex-col gap-y-2">
      {/*Label*/}
      <div className="flex items-center justify-between">
        <Input.Label htmlFor={register.name} className="text-text-primary">
          1CT Private Key
        </Input.Label>
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
        <CompactInput
          {...register}
          className="flex-1"
          id={register.name}
          placeholder="0x..."
          type={isPrivateKeyHidden ? 'password' : 'text'}
          errorTooltipContent={error}
          disabled={disabled}
        />
        <IconButton
          size="sm"
          icon={ShowHideButton}
          onClick={toggleIsPrivateKeyHidden}
          disabled={disabled}
        />
        <IconButton
          size="sm"
          icon={CopyButton}
          onClick={onCopyClick}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
