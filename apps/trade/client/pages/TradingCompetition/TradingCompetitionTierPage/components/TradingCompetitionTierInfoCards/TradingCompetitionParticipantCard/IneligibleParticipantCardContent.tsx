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
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
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
  const { show } = useDialog();

  const buttonUserStateErrorProps = useButtonUserStateErrorProps({
    handledErrors: {
      not_connected: true,
      incorrect_connected_chain: true,
      incorrect_chain_env: false,
      requires_initial_deposit: false,
      requires_sign_once_approval: false,
      requires_single_signature_setup: false,
    },
  });

  const {
    currentContestTierData,
    accountValueUsd,
    productBalance,
    stakedVrtx,
    config: { tierDataByContestId, eligibilityRequirement },
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

  const { eligibilityType, productMetadata } = eligibilityRequirement;

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

    // If we've reached here and the contest is active, we either show a user
    // state error CTA (e.g. if not connected, invalid chain) or action CTA.
    const buttonProps = (() => {
      if (contestStatus === 'pending') {
        return;
      }

      if (buttonUserStateErrorProps) {
        return buttonUserStateErrorProps;
      }

      const onClick =
        eligibilityType === 'staked_vrtx'
          ? () => show({ type: 'stake_v2_vrtx', params: {} })
          : () =>
              showDialogForProduct({
                productId: productMetadata?.productId ?? QUOTE_PRODUCT_ID,
                dialogType: 'deposit',
              });

      const children = `${eligibilityType === 'staked_vrtx' ? 'Stake' : 'Deposit'} to Join`;

      return { size: 'base' as const, onClick, children };
    })();

    const formattedMinEligibilityThreshold = formatNumber(
      currentContest.minEligibilityThreshold,
      {
        formatSpecifier:
          eligibilityType === 'account_value'
            ? PresetNumberFormatSpecifier.CURRENCY_INT
            : PresetNumberFormatSpecifier.NUMBER_INT,
      },
    );

    const message = {
      account_value: `Min. Account Size: ${formattedMinEligibilityThreshold}`,
      product_balance: `Min. ${productMetadata?.symbol} Balance: ${formattedMinEligibilityThreshold}`,
      staked_vrtx: `Min. ${productMetadata?.symbol} Staked: ${formattedMinEligibilityThreshold}`,
    }[eligibilityType];

    return {
      message,
      buttonProps,
      footer: (
        <DefinitionTooltip definitionId="tradingCompetitionEligibilityInfo">
          Eligibility updates every 3 hours
        </DefinitionTooltip>
      ),
    };
  })();

  const userEligibilityAmountLabel = {
    account_value: 'Current Size:',
    product_balance: 'Current Balance:',
    staked_vrtx: 'Current Staked:',
  }[eligibilityType];

  const userEligibilityAmount = {
    account_value: accountValueUsd,
    product_balance: productBalance,
    staked_vrtx: stakedVrtx,
  }[eligibilityType];

  const userEligibilityAmountFormatSpecifier =
    eligibilityType === 'account_value'
      ? PresetNumberFormatSpecifier.CURRENCY_2DP
      : CustomNumberFormatSpecifier.NUMBER_PRECISE;

  return (
    <>
      <TradingCompetitionCard.Body className="justify-between gap-y-4">
        <div className="flex flex-col">
          <span className="text-text-primary text-xl">{message}</span>
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label={userEligibilityAmountLabel}
            value={userEligibilityAmount}
            numberFormatSpecifier={userEligibilityAmountFormatSpecifier}
            valueClassName="items-center gap-x-2"
            valueEndElement={
              productMetadata ? (
                <Image
                  src={productMetadata.iconSrc}
                  className="h-4 w-auto"
                  alt={productMetadata.symbol}
                />
              ) : undefined
            }
            fitWidth
          />
        </div>
        {buttonProps && (
          <PrimaryButton className="w-full sm:w-auto" {...buttonProps} />
        )}
      </TradingCompetitionCard.Body>
      <TradingCompetitionCard.Footer>{footer}</TradingCompetitionCard.Footer>
    </>
  );
}
