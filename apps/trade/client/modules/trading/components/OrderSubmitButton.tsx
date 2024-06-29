import { BalanceSide } from '@vertex-protocol/contracts';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import {
  Button,
  getStateOverlayClassNames,
  PrimaryButton,
} from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { startCase } from 'lodash';
import { LiteralUnion } from 'type-fest';

interface OrderSubmitButtonProps extends WithClassnames {
  state: BaseActionButtonState;
  side: BalanceSide;
  isPerp: boolean;
  marketSymbol: string | undefined;
  // This solves IDE auto complete for literal string union, LiteralUnion should be removed when resolved.
  // More here: https://github.com/microsoft/TypeScript/issues/29729
  userStateError?: LiteralUnion<UserStateError, string>;
}

export function OrderSubmitButton({
  state,
  side,
  className,
  isPerp,
  marketSymbol,
  userStateError,
}: OrderSubmitButtonProps) {
  const { switchChain, primaryChain } = useEVMContext();
  const { show } = useDialog();

  const sharedButtonClassNames = joinClassNames(
    'py-1.5 rounded font-medium text-sm',
    className,
  );

  const userStateButtonProps = (() => {
    switch (userStateError) {
      case 'not_connected':
        return {
          onClick: () => show({ type: 'connect', params: {} }),
          label: 'Connect Wallet',
        };
      case 'incorrect_chain':
        return {
          onClick: () => switchChain(),
          label: `Switch to ${startCase(primaryChain.name)}`,
        };
      case 'requires_deposit':
        return {
          onClick: () => show({ type: 'deposit', params: {} }),
          label: 'Deposit Funds',
        };
      case 'requires_single_signature_setup':
        return {
          onClick: () => show({ type: 'signature_mode_settings', params: {} }),
          label: 'Setup 1CT',
        };
      case 'requires_sign_once_approval':
        return {
          onClick: () =>
            show({ type: 'single_signature_reapproval', params: {} }),
          label: 'Approve Trading',
        };
    }
  })();

  // Return early displaying a Primary button if `userStateError` is present
  if (userStateButtonProps) {
    const { onClick, label } = userStateButtonProps;

    return (
      <PrimaryButton className={sharedButtonClassNames} onClick={onClick}>
        {label}
      </PrimaryButton>
    );
  }

  const label = {
    long: isPerp ? 'Buy/Long' : 'Buy',
    short: isPerp ? 'Sell/Short' : 'Sell',
  }[side];

  const stateContent = {
    loading: (
      <ButtonStateContent.Loading singleSignatureMessage="Placing Order" />
    ),
    success: <ButtonStateContent.Success message="Order Submitted" />,
    disabled: `${label} ${marketSymbol ?? ''}`,
    idle: `${label} ${marketSymbol ?? ''}`,
  }[state];

  const disabled = state === 'disabled';
  const isLoading = state === 'loading';

  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    disabled,
    isLoading,
  });

  const sideColorClassNames = (() => {
    if (isLoading || disabled) {
      return 'border-disabled';
    }
    return [
      'border-transparent',
      side === 'long'
        ? 'bg-positive text-positive-muted'
        : 'bg-negative text-negative-muted',
    ];
  })();

  // If there is no `userStateError`, display the normal button
  return (
    <Button
      className={joinClassNames(
        'border',
        stateOverlayClassNames,
        sharedButtonClassNames,
        sideColorClassNames,
      )}
      type="submit"
      isLoading={isLoading}
      disabled={disabled}
    >
      {stateContent}
    </Button>
  );
}
