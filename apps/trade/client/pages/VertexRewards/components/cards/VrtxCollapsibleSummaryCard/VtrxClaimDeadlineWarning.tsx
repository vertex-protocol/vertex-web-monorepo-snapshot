import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import { Icons } from '@vertex-protocol/web-ui';

import { VrtxRewardEpoch } from 'client/modules/rewards/types';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';

export function VrtxClaimDeadlineWarning({
  lastCompletedEpoch,
}: {
  lastCompletedEpoch: VrtxRewardEpoch | undefined;
}) {
  const claimDeadlineMillis =
    lastCompletedEpoch?.subaccountTokenClaim?.claimDeadlineMillis;
  const epochLabel =
    lastCompletedEpoch?.epochNumber === LBA_AIRDROP_EPOCH
      ? `Epochs 1-${LBA_AIRDROP_EPOCH}`
      : `Epoch ${formatNumber(lastCompletedEpoch?.epochNumber, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}`;

  return (
    <div className="text-text-primary flex items-center gap-x-2 text-xs sm:text-sm">
      <Icons.BsExclamation className="bg-overlay-accent/20 h-5 w-5 shrink-0 rounded-full" />
      <div>
        You have until{' '}
        <span className="text-accent font-medium">
          {formatTimestamp(claimDeadlineMillis, {
            formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
          })}
        </span>{' '}
        to claim your rewards for {epochLabel}.
      </div>
    </div>
  );
}
