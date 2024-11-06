import {
  IndexerLeaderboardParticipant,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useButtonUserStateErrorProps } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { LeaderboardContest } from 'client/hooks/query/tradingCompetition/useLeaderboardContests';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { UseTradingCompetitionData } from 'client/modules/tradingCompetition/hooks/useTradingCompetitionData';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  participantByContestId:
    | Record<string, IndexerLeaderboardParticipant>
    | undefined;
  currentContest: LeaderboardContest;
  contests: LeaderboardContest[];
  contestStatus: UseTradingCompetitionData['currentContestStatus'];
}

export function IneligibleParticipantCardContent({
  participantByContestId,
  currentContest,
  contestStatus,
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();

  const buttonUserStateErrorProps = useButtonUserStateErrorProps({
    handledErrors: {
      not_connected: true,
      incorrect_connected_chain: true,
      incorrect_chain_env: false,
      requires_deposit: false,
      requires_sign_once_approval: false,
      requires_single_signature_setup: false,
    },
  });

  const {
    currentContestTierData,
    accountValueUsd,
    productBalance,
    config: { tierDataByContestId, requiredProductBalanceMetadata },
  } = useTradingCompetitionContext();

  if (!currentContestTierData || !participantByContestId) {
    return null;
  }

  // We need to determine if the participant is eligible for a higher tier.
  // Since a participant is only returned for the highest tier it qualifies for,
  // we can find its eligible contest id by parsing it from the returned record.
  const { eligibleTier, eligibleTierData, eligibleForHigherTier } = (() => {
    const eligibleContestIds = Object.keys(participantByContestId);

    if (!eligibleContestIds.length || !tierDataByContestId) {
      return {
        eligibleTier: undefined,
        eligibleTierData: undefined,
        eligibleForHigherTier: false,
      };
    }

    const eligibleContestId = parseInt(eligibleContestIds[0]);
    const eligibleTierData = tierDataByContestId[eligibleContestId];
    const eligibleTier = eligibleTierData.tier;
    const eligibleForHigherTier =
      eligibleTier && eligibleTier < currentContestTierData.tier;

    return { eligibleTier, eligibleTierData, eligibleForHigherTier };
  })();

  const { message, buttonProps, footer } = (() => {
    if (eligibleForHigherTier && eligibleTierData) {
      return {
        message: 'Account is in a higher tier',
        buttonProps: {
          size: 'base' as const,
          as: Link,
          href: eligibleTierData.href,
          children: `Go to Tier ${eligibleTier}`,
        },
        footer: "Your account exceeds this tier's account size requirements.",
      };
    }

    if (contestStatus === 'done') {
      return {
        message: 'Account ineligible',
        buttonProps: undefined,
        footer: "Your account did not meet this tier's requirements.",
      };
    }

    // If we've reached here and the contest is active, we either show a deposit
    // CTA or user state error CTA if necessary (not connected, invalid chain).
    // If this is a market-specific contest, we open the deposit dialog with
    // the relevant market selected.
    const buttonProps = (() => {
      if (contestStatus === 'pending') {
        return;
      }

      if (buttonUserStateErrorProps) {
        return buttonUserStateErrorProps;
      }

      return {
        size: 'base' as const,
        onClick: () =>
          showDialogForProduct({
            productId:
              requiredProductBalanceMetadata?.productId ?? QUOTE_PRODUCT_ID,
            dialogType: 'deposit',
          }),

        children: 'Deposit to Join',
      };
    })();

    const formattedMinEligibilityThreshold = formatNumber(
      currentContest.minEligibilityThreshold,
      {
        formatSpecifier: requiredProductBalanceMetadata
          ? PresetNumberFormatSpecifier.NUMBER_INT
          : PresetNumberFormatSpecifier.CURRENCY_INT,
      },
    );

    const message = requiredProductBalanceMetadata
      ? `Min. ${requiredProductBalanceMetadata.symbol} Balance: ${formattedMinEligibilityThreshold}`
      : `Min. Account Size: ${formattedMinEligibilityThreshold}`;

    return {
      message,
      buttonProps,
      footer: (
        <DefinitionTooltip definitionId="tradingCompetitionEligibilityInfo">
          Eligibility Info
        </DefinitionTooltip>
      ),
    };
  })();

  const balanceOrSizeLabel = requiredProductBalanceMetadata
    ? 'Current Balance:'
    : 'Current Size:';
  const balanceOrSizeValue = requiredProductBalanceMetadata
    ? productBalance
    : accountValueUsd;
  const balanceOrSizeFormatSpecifier = requiredProductBalanceMetadata
    ? CustomNumberFormatSpecifier.NUMBER_PRECISE
    : PresetNumberFormatSpecifier.CURRENCY_2DP;

  return (
    <>
      <TradingCompetitionCard.Body className="justify-between gap-y-4">
        <div className="flex flex-col">
          <span className="text-text-primary text-xl">{message}</span>
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label={balanceOrSizeLabel}
            value={balanceOrSizeValue}
            numberFormatSpecifier={balanceOrSizeFormatSpecifier}
            valueClassName="items-center gap-x-2"
            valueEndElement={
              requiredProductBalanceMetadata ? (
                <Image
                  src={requiredProductBalanceMetadata.iconSrc}
                  className="size-4"
                  alt={requiredProductBalanceMetadata.symbol}
                />
              ) : undefined
            }
            fitWidth
          />
        </div>
        {buttonProps && <PrimaryButton {...buttonProps} />}
      </TradingCompetitionCard.Body>
      <TradingCompetitionCard.Footer>{footer}</TradingCompetitionCard.Footer>
    </>
  );
}
