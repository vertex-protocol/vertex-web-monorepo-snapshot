import {
  joinClassNames,
  useCopyText,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';

interface LinkDisplayProps {
  referralLink: string | undefined;
  isConnected: boolean;
  requiresFirstDeposit: boolean | undefined;
  disabled?: boolean;
}

export function ReferralLinkBar({
  referralLink,
  isConnected,
  requiresFirstDeposit,
  disabled,
  className,
}: WithClassnames<LinkDisplayProps>) {
  const { copy, isCopied } = useCopyText();
  const hasReferralLink = !!referralLink;

  const displayMessage = (() => {
    if (!isConnected) {
      return 'Connect your wallet to view link';
    }
    if (requiresFirstDeposit) {
      return 'Deposit to view link';
    }
    return referralLink;
  })();

  const copyMessage = isCopied ? 'Copied!' : 'Copy';

  return (
    <Button
      className={joinClassNames(
        // Overflow hidden to hide the slight gradient overflow on the left that covers the border
        'relative overflow-hidden',
        'flex h-12 items-center gap-x-1 px-4',
        'border-accent rounded border',
        'bg-overlay-accent/10',
        disabled ? 'brightness-50' : 'hover:bg-overlay-accent/15',
        'shadow-elevation-referrals-bar',
        className,
      )}
      disabled={disabled}
      onClick={() => copy(referralLink)}
    >
      {/* Mobile gradient for the overflow shadow, but only when we have a link */}
      {hasReferralLink && (
        <div
          className={joinClassNames(
            'pointer-events-none absolute inset-0 sm:hidden',
            'from-background bg-gradient-to-r via-transparent',
          )}
        />
      )}
      <div className="text-text-primary flex items-center justify-end overflow-hidden whitespace-nowrap text-base sm:justify-start">
        {displayMessage}
      </div>
      <div className="flex-1" />
      {/* Static width to prevent a layout shift in the mobile display */}
      {hasReferralLink && (
        <div
          className={joinClassNames(
            'w-24 whitespace-nowrap text-right',
            'text-accent text-sm',
          )}
        >
          {copyMessage}
        </div>
      )}
    </Button>
  );
}
