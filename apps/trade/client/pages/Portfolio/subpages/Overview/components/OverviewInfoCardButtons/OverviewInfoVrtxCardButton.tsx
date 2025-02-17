import {
  useVertexMetadataContext,
  VRTX_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { Pill } from '@vertex-protocol/web-ui';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useStakingV2Rewards } from 'client/modules/staking/hooks/useStakingV2Rewards';
import { OverviewInfoCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton';
import Image from 'next/image';

interface Props {
  isPrivate: boolean;
}

/**
 * This is extracted from OverviewInfoCardButtons so that VRTX specific logic only runs when this is rendered (i.e. within Vertex and not Blitz)
 */
export function OverviewInfoVrtxCardButton({ isPrivate }: Props) {
  const { data: accountV2StakingState } = useAccountStakingV2State();
  const {
    protocolTokenMetadata: {
      token: { tokenDecimals },
    },
  } = useVertexMetadataContext();
  const { apr: stakingApr } = useStakingV2Rewards();

  const currentStakingBalance = removeDecimals(
    accountV2StakingState?.currentBalance,
    tokenDecimals,
  );

  return (
    <OverviewInfoCardButton
      href={ROUTES.staking}
      title={`${VRTX_TOKEN_INFO.symbol} Staked`}
      value={
        <>
          <div className="flex items-center gap-x-1">
            <Image
              src={VRTX_TOKEN_INFO.icon.asset}
              alt={VRTX_TOKEN_INFO.symbol}
              className="h-auto w-4"
            />
            <span>
              {formatNumber(currentStakingBalance, {
                formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
              })}
            </span>
          </div>
        </>
      }
      valueClassName="gap-x-2 items-end"
      pill={
        <Pill colorVariant="accent" sizeVariant="xs">
          APR:
          <span>
            {formatNumber(stakingApr, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </span>
        </Pill>
      }
      isPrivate={isPrivate}
    />
  );
}
