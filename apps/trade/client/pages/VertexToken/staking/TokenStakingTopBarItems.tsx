import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from 'client/pages/VertexToken/consts';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import { TokenStakingActionButtons } from './TokenStakingActionButtons';

interface Props {
  accountAvailableToStake: BigDecimal | undefined;
  accountStaked: BigDecimal | undefined;
  accountStakedValueUsd: BigDecimal | undefined;
  accountScore: BigDecimal | undefined;
  accountScoreMultiplierFraction: BigDecimal | undefined;
  accountMaxScore: BigDecimal | undefined;
  userActionState: UserActionState;
  usdcSymbol: string;
}

export function TokenStakingTopBarItems({
  accountAvailableToStake,
  accountStaked,
  accountStakedValueUsd,
  accountScore,
  accountScoreMultiplierFraction,
  accountMaxScore,
  userActionState,
  usdcSymbol,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6 lg:flex-row">
      <div className="flex flex-col gap-y-6 lg:flex-1">
        <p className="text-text-secondary text-xs sm:text-sm">
          Stake {VRTX_TOKEN_INFO.symbol} to earn a share of the protocol&apos;s
          revenue in {usdcSymbol}
        </p>
        <RewardsCard.MetricsPane>
          <RewardsCard.StackedItem
            label={`Total ${VRTX_TOKEN_INFO.symbol} Staked`}
            value={
              <div className="text-text-primary flex items-center gap-x-1.5">
                <Image
                  src={VRTX_TOKEN_INFO.icon.asset}
                  alt="VRTX"
                  className="h-auto w-[18px]"
                />
                <div className="flex items-baseline gap-x-1">
                  <span>
                    {formatNumber(accountStaked, {
                      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                    })}
                  </span>
                  <span className="text-text-tertiary text-xs sm:text-sm">
                    {formatNumber(accountStakedValueUsd, {
                      formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                    })}
                  </span>
                </div>
              </div>
            }
          />
          <RewardsCard.StackedItem
            label="Multiplier"
            definitionId="stakingMultiplier"
            value={
              <>
                <span className="text-text-primary">
                  {formatNumber(accountScoreMultiplierFraction, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                  })}
                  x
                </span>
                <span className="text-text-tertiary text-xs sm:text-sm">
                  /2.5x
                </span>
              </>
            }
          />
          <RewardsCard.StackedItem
            label="voVRTX Score"
            definitionId="stakingAccountScore"
            value={
              <div className="flex items-center gap-x-1">
                <Image src={TOKEN_ICONS.vovrtx.asset} alt="VRTX" />
                <div className="text-accent flex items-baseline gap-x-1">
                  {formatNumber(accountScore, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                  })}
                  <span className="text-text-tertiary text-xs sm:text-sm">
                    /
                    {formatNumber(accountMaxScore, {
                      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                    })}
                  </span>
                </div>
              </div>
            }
          />
        </RewardsCard.MetricsPane>
      </div>
      <div
        className={joinClassNames(
          'flex flex-col justify-between gap-y-4',
          TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES,
        )}
      >
        <RewardsCard.LineItem
          className="w-max items-center gap-x-2.5"
          label={
            <>
              <Icons.BsWallet2 size={18} className="text-text-secondary" />
              Available to stake:
            </>
          }
          definitionId="stakingVrtxInWallet"
          value={formatNumber(accountAvailableToStake, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
          })}
          labelClassName="flex items-center gap-x-2 text-sm"
          symbol={VRTX_TOKEN_INFO.symbol}
        />
        <TokenStakingActionButtons userActionState={userActionState} />
      </div>
    </div>
  );
}
