import { BalanceSide } from '@vertex-protocol/contracts';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  PrimaryButton,
} from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useButtonUserStateErrorProps } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';

interface OrderSubmitButtonProps extends WithClassnames {
  state: BaseActionButtonState;
  side: BalanceSide;
  isPerp: boolean;
  marketSymbol: string | undefined;
}

export function OrderSubmitButton({
  state,
  side,
  className,
  isPerp,
  marketSymbol,
}: OrderSubmitButtonProps) {
  const userStateErrorButtonProps = useButtonUserStateErrorProps();

  const sharedButtonClassNames = joinClassNames(
    'py-1.5 rounded font-medium text-sm',
    className,
  );

  // Return early displaying a Primary button if `userStateError` is present
  if (userStateErrorButtonProps) {
    return (
      <PrimaryButton
        className={sharedButtonClassNames}
        {...userStateErrorButtonProps}
      />
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
