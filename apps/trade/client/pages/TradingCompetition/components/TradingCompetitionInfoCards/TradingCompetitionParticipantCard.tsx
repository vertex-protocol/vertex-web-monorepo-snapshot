import { IndexerLeaderboardParticipant } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountLeaderboardState } from 'client/hooks/query/tradingCompetition/useSubaccountLeaderboardState';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { signDependentValue } from 'client/utils/signDependentValue';

export function TradingCompetitionParticipantCard() {
  const { show } = useDialog();
  const userActionState = useUserActionState();

  const { currentContest, currentContestStatus } =
    useTradingCompetitionContext();
  const { data: participantData } = useSubaccountLeaderboardState({
    contestId: currentContest?.contestId,
  });

  // We only show participant rank stats if they're eligible (`participant`
  // is not `null`) and the contest isn't pending.
  // Using non-strict comparison on `null` so we also avoid rendering when we
  // don't yet have a `participant` response.
  if (
    participantData?.participant != null &&
    currentContestStatus !== 'pending'
  ) {
    return (
      <TradingCompetitionCard className="gap-x-6">
        <ParticipantRank participant={participantData?.participant} />
      </TradingCompetitionCard>
    );
  }

  return (
    <TradingCompetitionCard className="flex-wrap items-center gap-6">
      <ValueWithLabel.Vertical
        label="To Join"
        className="self-stretch"
        valueClassName="flex-1"
        valueContent={
          <>
            Min account size of{' '}
            {formatNumber(currentContest?.minRequiredAccountValue, {
              formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_INT,
            })}
          </>
        }
      />
      {currentContestStatus === 'active' && (
        <PrimaryButton
          size="lg"
          className="px-10"
          onClick={() => show({ type: 'deposit', params: {} })}
          disabled={userActionState === 'block_all'}
        >
          Deposit to Join
        </PrimaryButton>
      )}
    </TradingCompetitionCard>
  );
}

function ParticipantRank({
  participant,
}: {
  participant: IndexerLeaderboardParticipant | undefined;
}) {
  const quotePriceUsd = usePrimaryQuotePriceUsd();
  const pnlUsd = participant?.pnl.multipliedBy(quotePriceUsd);

  return (
    <>
      <ValueWithLabel.Vertical
        label="Your Rank"
        valueClassName="bg-surface-3 rounded px-2 py-1 w-max"
        valueContent={`#${formatNumber(participant?.roiRank, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}`}
      />
      <ValueWithLabel.Vertical
        label="PnL"
        valueClassName={joinClassNames(
          'items-center',
          signDependentValue(participant?.pnl, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          }),
        )}
        valueContent={
          <>
            {formatNumber(participant?.percentRoi, {
              formatSpecifier:
                PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
            })}{' '}
            <span className="text-xs lg:text-sm">
              (
              {formatNumber(pnlUsd, {
                formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
              })}
              )
            </span>
          </>
        }
      />
    </>
  );
}
