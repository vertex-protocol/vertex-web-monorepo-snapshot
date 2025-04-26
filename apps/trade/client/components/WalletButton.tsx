import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  /**
   * Accepts strings for remote src URLs / inline base64 images or ReactNode for local icons
   */
  walletIcon: ReactNode | string;
  walletName: string;
  isLoading: boolean;
  isDisabled: boolean;

  onClick(): void;
}

export const WALLET_BUTTON_ICON_SIZE_CLASSNAME = 'size-5';

export function WalletButton({
  className,
  walletIcon,
  walletName,
  isLoading,
  isDisabled,
  onClick,
}: Props) {
  // If icon is a string, then it is a remote src URL
  const startIcon =
    typeof walletIcon === 'string' ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={walletIcon}
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
        alt={walletName}
      />
    ) : (
      walletIcon
    );

  return (
    <SecondaryButton
      className={joinClassNames(
        'flex items-center justify-start px-2 py-3',
        'text-text-primary',
        className,
      )}
      onClick={onClick}
      isLoading={isLoading}
      disabled={isDisabled}
      startIcon={startIcon}
    >
      {isLoading ? 'Waiting for wallet' : walletName}
    </SecondaryButton>
  );
}
