import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';
import { Subaccount } from 'client/context/subaccount/types';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { QuoteTransferSubaccount } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormData';
import { Token } from '@vertex-protocol/metadata';

interface Props {
  currentSubaccount: Subaccount;
  senderSubaccount: QuoteTransferSubaccount;
  recipientSubaccount: QuoteTransferSubaccount;
  primaryQuoteToken: Token;
}

export function SubaccountQuoteTransferOverviewCards({
  currentSubaccount,
  senderSubaccount,
  recipientSubaccount,
  primaryQuoteToken,
}: Props) {
  return (
    // `relative` for positioning the arrow icon.
    <div className="relative grid grid-cols-2 gap-x-3">
      <SubaccountOverviewCard
        subaccount={senderSubaccount}
        currentSubaccount={currentSubaccount}
        primaryQuoteToken={primaryQuoteToken}
      />
      <TransferArrowIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <SubaccountOverviewCard
        subaccount={recipientSubaccount}
        currentSubaccount={currentSubaccount}
        primaryQuoteToken={primaryQuoteToken}
      />
    </div>
  );
}

interface SubaccountOverviewCardProps {
  subaccount: QuoteTransferSubaccount;
  currentSubaccount: Subaccount;
  primaryQuoteToken: Token;
}

function SubaccountOverviewCard({
  subaccount,
  currentSubaccount,
  primaryQuoteToken,
}: SubaccountOverviewCardProps) {
  return (
    <div className="bg-surface-1 flex flex-col gap-y-3 rounded p-3">
      {/* `w-full` for truncating username. */}
      <div className="flex w-full items-center justify-center gap-x-2">
        <ProfileAvatarIcon
          avatar={subaccount.profile.avatar}
          subaccountName={subaccount.subaccountName}
          size={24}
        />
        <span className="text-text-primary truncate">
          {subaccount.profile.username}
        </span>
        {subaccount.subaccountName === currentSubaccount.name && (
          <StatusIndicator colorVariant="positive" />
        )}
      </div>
      {/* `w-full` for truncating balance. */}
      <div className="text-text-tertiary flex w-full justify-center gap-x-1 text-xs">
        <span className="text-text-primary truncate">
          {formatNumber(subaccount.decimalAdjustedQuoteProductBalance, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
          })}
        </span>
        <span>{primaryQuoteToken.symbol}</span>
      </div>
    </div>
  );
}

function TransferArrowIcon({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'border-stroke bg-surface-2 rounded border p-1',
        className,
      )}
    >
      <Icons.ArrowRight className="size-4" />
    </div>
  );
}
