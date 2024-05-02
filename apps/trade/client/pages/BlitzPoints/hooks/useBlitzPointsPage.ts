import { GetIndexerBlitzInitialDropConditionsResponse } from '@vertex-protocol/client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useAddressBlitzInitialPointsDropStatus } from 'client/hooks/query/points/useAddressBlitzInitialPointsDropStatus';
import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { useReferralLink } from 'client/modules/rewards/hooks/useReferralLink';
import { sumBy } from 'lodash';
import { useMemo } from 'react';

interface UseBlitzPointsPage {
  referralLink: string | undefined;
  // Initial claim
  initialDropConditionsResponse:
    | GetIndexerBlitzInitialDropConditionsResponse
    | undefined;
  showInitialClaimCard: boolean;
  hasClaimedInitialPoints: boolean;
  hasInitialPoints: boolean;
  numCompletedInitialClaimSteps: number;
  numTotalInitialClaimSteps: number;
  // Blitz points
  blitzClaimedInitialPoints: BigDecimal | undefined;
  blitzTotalPoints: BigDecimal | undefined;
  blitzReferralPoints: BigDecimal | undefined;
  blitzTradingPoints: BigDecimal | undefined;
  // Blast points & gold
  blastPoints: BigDecimal | undefined;
  blastGold: BigDecimal | undefined;

  dismissInitialClaimCard(): void;
}

export function useBlitzPointsPage(): UseBlitzPointsPage {
  const { shouldShow: showInitialClaimCard, dismiss: dismissInitialClaimCard } =
    useShowUserDisclosure('blitz_points_claim_complete');
  const { data: blitzPointsData } = useAddressBlitzPoints();
  const { data: initialDropConditionsResponse } =
    useAddressBlitzInitialPointsDropStatus();
  const referralLink = useReferralLink();

  const numCompletedInitialClaimSteps = useMemo(() => {
    if (!initialDropConditionsResponse) {
      return 0;
    }

    const { accountValueReached, perpTradesCompleted } =
      initialDropConditionsResponse;
    return sumBy([accountValueReached, perpTradesCompleted], (isComplete) =>
      isComplete ? 1 : 0,
    );
  }, [initialDropConditionsResponse]);

  const numTotalInitialClaimSteps = 2;
  const hasInitialPoints = !!initialDropConditionsResponse?.amount.gt(0);
  const hasClaimedInitialPoints =
    numCompletedInitialClaimSteps === numTotalInitialClaimSteps;

  return {
    initialDropConditionsResponse,
    showInitialClaimCard: showInitialClaimCard && hasInitialPoints,
    dismissInitialClaimCard,
    hasClaimedInitialPoints,
    hasInitialPoints,
    numCompletedInitialClaimSteps,
    numTotalInitialClaimSteps,
    referralLink,
    blastGold: blitzPointsData?.blast.gold,
    blastPoints: blitzPointsData?.blast.points,
    blitzClaimedInitialPoints: blitzPointsData?.blitz.initialPoints,
    blitzTradingPoints: blitzPointsData?.blitz.tradingPoints,
    blitzReferralPoints: blitzPointsData?.blitz.referralPoints,
    blitzTotalPoints: blitzPointsData?.blitz.totalPoints,
  };
}
