import {
  AppManagedWalletConnector,
  isPrivateKey,
  KNOWN_CONNECTOR_IDS,
  useEVMContext,
} from '@vertex-protocol/react-client';
import {
  CompactInput,
  CompactInputProps,
  Input,
  PrimaryButton,
} from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import {
  ConnectCustomWalletErrorType,
  ConnectCustomWalletFormValues,
} from 'client/modules/app/dialogs/onboarding/connectCustomWallet/types';
import {
  validateAddress,
  validatePrivateKey,
} from 'client/modules/app/dialogs/onboarding/connectCustomWallet/validators';
import { watchFormError } from 'client/utils/form/watchFormError';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { isAddress } from 'viem';
import { useConnect } from 'wagmi';

export function ConnectCustomWalletDialog() {
  const { connect } = useEVMContext();
  const { connectors } = useConnect();
  const { hide } = useDialog();

  const customWalletConnector = useMemo(() => {
    return connectors.find(
      (connector) => connector.id === KNOWN_CONNECTOR_IDS.customWallet,
    ) as AppManagedWalletConnector | undefined;
  }, [connectors]);

  const form = useForm<ConnectCustomWalletFormValues>({
    mode: 'onTouched',
    defaultValues: {
      signingKey: '',
      customAddress: '',
    },
  });

  const signingKeyError: ConnectCustomWalletErrorType | undefined =
    watchFormError(form, 'signingKey');
  const customAddressError: ConnectCustomWalletErrorType | undefined =
    watchFormError(form, 'customAddress');

  const onSubmit = (values: ConnectCustomWalletFormValues) => {
    if (!customWalletConnector) {
      return;
    }

    const signingKey = isPrivateKey(values.signingKey)
      ? values.signingKey
      : undefined;
    const customAddress = isAddress(values.customAddress)
      ? values.customAddress
      : null;

    customWalletConnector.setAddressOverride(customAddress);
    if (signingKey) {
      customWalletConnector.setPrivateKey(signingKey);
    }

    connect(customWalletConnector);
    hide();
  };

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Custom Wallet</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <InputSection
            label="Signing Private Key"
            helpText="The private key for signing transactions. Leave blank to autogenerate."
            inputName="signingKey"
            inputProps={{
              type: 'password',
              errorTooltipContent: signingKeyError
                ? 'Please enter a valid private key.'
                : undefined,
              ...form.register('signingKey', {
                validate: validatePrivateKey,
              }),
            }}
          />
          <InputSection
            label="Custom Address"
            helpText="View the app as a different address. Leave blank to use the address associated with the signing key."
            inputName="customAddress"
            inputProps={{
              errorTooltipContent: customAddressError
                ? 'Please enter a valid address.'
                : undefined,
              ...form.register('customAddress', {
                validate: validateAddress,
              }),
            }}
          />
          <PrimaryButton type="submit">Connect</PrimaryButton>
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

interface InputSectionProps {
  inputProps: CompactInputProps;
  helpText: string;
  label: string;
  inputName: string;
}

function InputSection({
  inputProps,
  helpText,
  label,
  inputName,
}: InputSectionProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Input.Label className="text-text-secondary" htmlFor={inputName}>
        {label}
      </Input.Label>
      <div className="flex flex-col gap-y-1">
        <CompactInput name={inputName} placeholder="0x..." {...inputProps} />
        <p className="text-2xs text-text-tertiary text-left">{helpText}</p>
      </div>
    </div>
  );
}
