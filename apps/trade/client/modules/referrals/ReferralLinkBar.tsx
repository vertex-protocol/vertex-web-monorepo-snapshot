import {
  joinClassNames,
  useCopyText,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useSocialShareLinks } from 'client/hooks/util/useSocialShareLinks';
import Link from 'next/link';

interface Props extends WithClassnames {
  isConnected: boolean;
  requiresFirstDeposit: boolean;
  baseUrlWithQueryParam: string;
  /**
   * Referral code to be appended to referralLinkBaseUrl
   * `null` means the referral code does not exist, ie when user is not connected, or if not a Fuul referral, when user has not made a deposit
   */
  referralCode: string | null | undefined;
  /**
   * Text to use when sharing to Twitter / Telegram
   */
  socialShareText: string;
}

export function ReferralLinkBar({
  baseUrlWithQueryParam,
  referralCode,
  requiresFirstDeposit,
  isConnected,
  socialShareText,
  className,
}: Props) {
  const referralLink = `${baseUrlWithQueryParam}${referralCode ?? ''}`;

  const linkContent = (() => {
    if (!!referralCode) {
      return (
        // Overflow hidden here is required to allow truncate to work
        <div className="flex w-full justify-between gap-x-2 overflow-hidden">
          <span className="truncate">
            {baseUrlWithQueryParam}
            <span className="text-text-primary">{referralCode}</span>
          </span>
          <LinkActionButtons
            referralLink={referralLink}
            socialShareText={socialShareText}
          />
        </div>
      );
    }
    if (!isConnected) {
      return 'Connect your wallet to view link';
    }

    if (requiresFirstDeposit) {
      return 'Deposit to view link';
    }

    return null;
  })();

  return (
    <div
      className={joinClassNames(
        'bg-surface-2 text-text-tertiary flex h-11 items-center rounded px-3',
        className,
      )}
    >
      {linkContent}
    </div>
  );
}

function LinkActionButtons({
  referralLink,
  socialShareText,
}: {
  referralLink: string;
  socialShareText: string;
}) {
  const { telegram, twitter } = useSocialShareLinks(
    socialShareText,
    referralLink,
  );
  const { isCopied, copy } = useCopyText();

  const CopyIcon = isCopied ? Icons.Check : Icons.Copy;

  return (
    <div className="flex items-center">
      <TextButton
        colorVariant="secondary"
        className="p-1"
        startIcon={<CopyIcon />}
        onClick={() => copy(referralLink)}
      />
      <TextButton
        colorVariant="secondary"
        className="p-1"
        as={Link}
        external
        href={twitter}
        startIcon={<Icons.XLogo />}
      />
      <TextButton
        colorVariant="secondary"
        className="p-1"
        as={Link}
        external
        href={telegram}
        startIcon={<Icons.TelegramLogo />}
      />
    </div>
  );
}
