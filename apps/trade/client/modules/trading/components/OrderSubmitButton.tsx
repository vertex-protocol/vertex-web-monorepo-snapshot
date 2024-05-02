import { BalanceSide } from '@vertex-protocol/contracts';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { Button, PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { startCase } from 'lodash';
import { useMemo } from 'react';
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

  const message = useMemo(() => {
    const label = {
      long: isPerp ? 'Buy/Long' : 'Buy',
      short: isPerp ? 'Sell/Short' : 'Sell',
    }[side];

    switch (state) {
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Placing Order" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Order Submitted" />;
      default:
        return `${label} ${marketSymbol ?? ''}`;
    }
  }, [isPerp, side, state, marketSymbol]);

  const sharedButtonClassNames = joinClassNames(
    'w-full py-1.5 rounded font-medium text-sm',
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
      case 'requires_sign_once_approval':
        return {
          onClick: () =>
            show({ type: 'single_signature_reapproval', params: {} }),
          label: 'Approve Trading',
        };
    }
  })();

  if (userStateButtonProps) {
    const { onClick, label } = userStateButtonProps;

    return (
      <PrimaryButton
        className={sharedButtonClassNames}
        size="lg"
        onClick={onClick}
      >
        {label}
      </PrimaryButton>
    );
  }

  const disabled = state === 'disabled';
  const isLoading = state === 'loading';
  const sideColorClassNames = (() => {
    if (disabled || isLoading) {
      return 'ring-1 ring-disabled';
    }

    return [
      'hover:brightness-110',
      side === 'long'
        ? 'bg-positive text-positive-muted'
        : 'bg-negative text-negative-muted',
    ];
  })();
  return (
    <Button
      className={joinClassNames(sharedButtonClassNames, sideColorClassNames)}
      type="submit"
      isLoading={isLoading}
      disabled={disabled}
    >
      {message}
    </Button>
  );
}
