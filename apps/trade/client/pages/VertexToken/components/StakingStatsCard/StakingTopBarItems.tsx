import { TOKEN_ICONS, VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useAccountStakingMetrics } from 'client/modules/rewards/hooks/useAccountStakingMetrics';
import { StakingActionButtons } from 'client/pages/VertexToken/components/StakingStatsCard/StakingActionButtons';
import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from 'client/pages/VertexToken/consts';
import Image from 'next/image';

export function StakingTopBarItems() {
  const {
    accountMaxScore,
    accountScore,
    accountScoreMultiplierFraction,
    primaryQuoteToken,
    protocolTokenMetadata,
    accountStaked,
    accountStakedValueUsd,
  } = useAccountStakingMetrics();

  const iconClassNames = 'h-auto w-5';

  return (
    <div className="flex flex-col gap-y-6 lg:flex-row">
      <div className="flex flex-col gap-y-6 lg:flex-1">
        <p className="text-text-tertiary text-xs sm:text-sm">
          Stake {protocolTokenMetadata.token.symbol} to earn a share of the
          protocol&apos;s revenue in {primaryQuoteToken.symbol}
        </p>
        <RewardsCard.MetricsPane>
          <ValueWithLabel.Vertical
            label={`Total ${VRTX_TOKEN_INFO.symbol} Staked`}
            valueContent={
              <div className="text-text-primary flex items-center gap-x-1.5">
                <Image
                  src={VRTX_TOKEN_INFO.icon.asset}
                  alt="VRTX"
                  className={iconClassNames}
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
          <ValueWithLabel.Vertical
            label="Multiplier"
            tooltip={{ id: 'stakingMultiplier' }}
            valueEndElement="/2.5x"
            value={accountScoreMultiplierFraction}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
          <ValueWithLabel.Vertical
            label="voVRTX Score"
            tooltip={{ id: 'stakingAccountScore' }}
            valueContent={
              <div className="flex items-center gap-x-1">
                <Image
                  src={TOKEN_ICONS.vovrtx.asset}
                  alt="VRTX"
                  className={iconClassNames}
                />
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
      <StakingActionButtons
        className={joinClassNames(
          'sm:self-end',
          TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES,
        )}
      />
    </div>
  );
}
