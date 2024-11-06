import { removeDecimals } from '@vertex-protocol/client';
import {
  AnnotatedSpotMarket,
  useVertexMetadataContext,
} from '@vertex-protocol/metadata';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { calcStakingScoreRange } from 'client/utils/calcs/stakingV1Calcs';
import { safeDiv } from 'client/utils/safeDiv';
import { useMemo } from 'react';

export function useAccountStakingMetrics() {
  const { data: accountStakingState } = useAccountStakingState();
  const { protocolTokenMetadata, primaryQuoteToken } =
    useVertexMetadataContext();
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const vrtxDecimals = protocolTokenMetadata.token.tokenDecimals;

  const {
    accountMaxScore,
    accountScore,
    accountScoreMultiplierFraction,
    accountStaked,
    accountStakedValueUsd,
  } = useMemo(() => {
    // Amount of VRTX staked by the account
    const accountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      vrtxDecimals,
    );

    const accountStakedValueUsd = (() => {
      if (!vrtxSpotMarket || !accountStaked) {
        return;
      }
      return vrtxSpotMarket.product.oraclePrice
        .multipliedBy(accountStaked)
        .multipliedBy(primaryQuotePriceUsd);
    })();

    // Amount of VRTX score earned by the account
    const accountScore = removeDecimals(
      accountStakingState?.stakingScore,
      vrtxDecimals,
    );

    const accountMaxScore = (() => {
      if (!accountStaked) {
        return;
      }
      return calcStakingScoreRange(accountStaked).max;
    })();

    // Score multiplier
    const accountScoreMultiplierFraction = (() => {
      if (!accountStaked || !accountScore) {
        return;
      }
      return safeDiv(accountScore, accountStaked);
    })();

    return {
      accountStaked,
      accountStakedValueUsd,
      accountScore,
      accountScoreMultiplierFraction,
      accountMaxScore,
    };
  }, [accountStakingState, vrtxSpotMarket, vrtxDecimals, primaryQuotePriceUsd]);

  return {
    accountStakingState,
    accountMaxScore,
    accountScore,
    accountScoreMultiplierFraction,
    accountStaked,
    accountStakedValueUsd,
    protocolTokenMetadata,
    primaryQuoteToken,
  };
}
