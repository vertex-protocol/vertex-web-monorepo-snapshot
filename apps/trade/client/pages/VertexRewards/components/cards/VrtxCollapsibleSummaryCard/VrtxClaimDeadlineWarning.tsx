import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  COMMON_TRANSPARENCY_COLORS,
  formatTimestamp,
  Icons,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { VrtxRewardEpoch } from 'client/modules/rewards/types';

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
      <Icons.ExclamationMark
        className={joinClassNames(
          'size-5 shrink-0 rounded-full p-0.5',
          COMMON_TRANSPARENCY_COLORS.bgAccent,
        )}
      />
      <div>
        You have until{' '}
        <span className="text-accent">
          {formatTimestamp(claimDeadlineMillis, {
            formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
          })}
        </span>{' '}
        to claim your rewards for {epochLabel}.
      </div>
    </div>
  );
}
